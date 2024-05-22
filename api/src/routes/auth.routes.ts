import { Router } from "express";
import { loginHandler, createUserHandler } from "@/controllers";
import { registry } from "@/registry";
import {
  LoginResponseSchema,
  LoginSchema,
  UserCreateSchema,
  UserResponseSchema,
} from "@/schemas";

const router = Router();

// Login API
router.post("/login", loginHandler);
registry.registerPath({
  path: "/api/auth/login",
  method: "post",
  description: "Login",
  tags: ["Authentication"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: LoginResponseSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              status: { type: "number" },
              message: { type: "string" },
            },
          },
        },
      },
    },
  },
});

// Create user
router.post("/register", createUserHandler);
registry.registerPath({
  path: "/api/auth/register",
  method: "post",
  description: "Create user",
  tags: ["User"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserCreateSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Success",
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "Invalid input" },
            },
          },
        },
      },
    },
  },
});

export default router;
