import prisma from "@/prisma";
import jwt from "jsonwebtoken";
import * as password from "@/utils";
import {
  UserResponseSchema,
  type UserCreateInput,
  type UserResponse,
  UserUpdateInput,
} from "@/schemas";

// create a new super admin
export const createUser = async (payload: UserCreateInput) => {
  const hashed = await password.hash(payload.password);

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashed,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  return UserResponseSchema.parse(user);
};

// generate jwt token
export const generateToken = async (payload: UserResponse) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

// find user by email
export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};

// get user by id
export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return UserResponseSchema.parse(user);
};

// update user by id
export const updateUser = async (id: string, payload: UserUpdateInput) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
};

// check if old password is correct
export const checkOldPassword = async (id: string, payload: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      password: true,
    },
  });

  if (!user) throw new Error("User not found");

  const isMatch = await password.compare(payload, user.password);
  return !!isMatch;
};

// update user password
export const updateUserPassword = async (id: string, payload: string) => {
  const hashed = await password.hash(payload);

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashed,
    },
  });

  return user;
};

//Get all tasks of a User
export const getUserTasks = async (userId: string) => {
  const tasks = await prisma.tasks.findMany({
    where: {
      userId,
    },
  });
  return tasks;
};
