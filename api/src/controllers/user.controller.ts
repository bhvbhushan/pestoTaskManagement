import { Request, Response, NextFunction } from "express";
import {
  getUserById,
  checkOldPassword,
  updateUserPassword,
  updateUser,
} from "@/services";
import { BadRequest, NotAuthorized, NotFound } from "@/utils";
import { UserUpdateSchema } from "@/schemas";
import { PASS_NOT_MATCH, SUCC_PASS_CHANGE, USER_NOT_FOUND } from "@/constants";

// GET /api/profile/me (Get Current User)
export const getCurrentUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUserById(req?.user?.id);

    if (!user) {
      throw new NotFound(USER_NOT_FOUND);
    }

    const response = {
      status: 200,
      data: user,
    };

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

// POST /api/profile/me/password (Update Password)
export const updatePasswordHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // check old password
    const isMatch = await checkOldPassword(req.user?.id, oldPassword);

    if (!isMatch) {
      throw new BadRequest(PASS_NOT_MATCH);
    }

    // update password
    await updateUserPassword(req.user?.id, newPassword);

    return res.status(200).json({
      status: 200,
      message: SUCC_PASS_CHANGE,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id (Update User)
export const updateUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const parsedBody = UserUpdateSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.errors);
    }

    // update user
    const user = await updateUser(id, parsedBody.data);

    if (!user) {
      throw new NotFound(USER_NOT_FOUND);
    }

    const response = {
      status: 200,
      data: user,
    };

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
