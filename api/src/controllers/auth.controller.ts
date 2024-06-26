import { Request, Response, NextFunction } from "express";
import { compare } from "@/utils";
import { getUserByEmail, generateToken, createUser } from "@/services";
import { LoginSchema, UserCreateSchema, UserResponseSchema } from "@/schemas";

// Login to the system
export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedBody = LoginSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.errors);
    }

    const user = await getUserByEmail(parsedBody.data.email);

    const errorResponse = {
      status: 400,
      message: "Invalid credentials",
      instructions: "Please check your credentials and try again",
    };

    // user not found
    if (!user) {
      return res.status(errorResponse.status).json(errorResponse);
    }

    // validate password
    const isPasswordValid = await compare(
      parsedBody.data.password,
      user.password
    );
    if (!isPasswordValid) {
      res.status(errorResponse.status).json(errorResponse);
    }

    // generate access token
    const token = await generateToken(UserResponseSchema.parse(user));

    const response = {
      status: 200,
      message: "Login successful",
      token,
    };
    res.status(response.status).json(response);
  } catch (e) {
    next(e);
  }
};

export const createUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsedBody = UserCreateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.errors);
    }

    const user = await createUser(parsedBody.data);

    const response = {
      status: 201,
      data: user,
    };
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
