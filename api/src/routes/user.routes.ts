import { Router } from "express";
import { updateUserHandler } from "@/controllers";
import { registry } from "@/registry";
import { UserUpdateSchema, UserResponseSchema } from "@/schemas";
import {
  BAD_REQ,
  INVALID_INPUT,
  NOT_FOUND,
  SUCC,
  USER_NOT_FOUND,
} from "@/constants";

const router = Router();

// Update user
router.put("/:id", updateUserHandler);
registry.registerPath({
  path: "/api/users/{id}",
  method: "put",
  description: "Update user",
  tags: ["User"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      in: "path",
      name: "id",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: SUCC,
      content: {
        "application/json": {
          schema: UserResponseSchema,
        },
      },
    },
    400: {
      description: BAD_REQ,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: INVALID_INPUT },
            },
          },
        },
      },
    },
    404: {
      description: NOT_FOUND,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: USER_NOT_FOUND },
            },
          },
        },
      },
    },
  },
});

export default router;
