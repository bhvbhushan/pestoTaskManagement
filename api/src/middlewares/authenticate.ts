import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "@/services";
import { NotAuthenticated, NotFound } from "@/utils";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new NotAuthenticated());
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET!);

    const user = await getUserByEmail(decoded.email);

    if (!user) {
      return next(new NotFound());
    }

    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthenticated());
  }
};

export default authenticate;
