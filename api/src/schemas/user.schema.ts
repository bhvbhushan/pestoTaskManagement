import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const UserCreateSchema = z
  .object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
  })
  .openapi("UserCreateInput");

export type UserCreateInput = z.infer<typeof UserCreateSchema>;

export const UserResponseSchema = UserCreateSchema.omit({
  password: true,
})
  .extend({
    id: z.string(),
  })
  .openapi("UserResponse");

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const UserUpdateSchema = UserCreateSchema.pick({
  name: true,
  email: true,
})
  .partial()
  .openapi("UserUpdateInput");

export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;

export const UserPasswordUpdateSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string().min(8).max(255),
  })
  .openapi("UserPasswordUpdateSchema");

export type UserPasswordUpdateInput = z.infer<typeof UserPasswordUpdateSchema>;

export const LoginSchema = z
  .object({
    email: z.string().email().openapi({
      example: "john@example.com",
    }),
    password: z.string(),
  })
  .openapi("LoginDTO");

export type LoginInput = z.infer<typeof LoginSchema>;

export const LoginResponseSchema = z
  .object({
    token: z.string().openapi({ example: "Bearer <token>" }),
  })
  .openapi("LoginResponse");
