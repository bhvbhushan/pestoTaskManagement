import { Router } from "express";
import { registry } from "@/registry";
import { getCurrentUserHandler, updatePasswordHandler } from "@/controllers";
import {
  GET_PROFILE,
  SUCC,
  BAD_REQ,
  INVALID_INPUT,
  NOT_FOUND,
  USER_NOT_FOUND,
  CHANGE_PASS,
} from "@/constants";
import { UserPasswordUpdateSchema, UserResponseSchema } from "@/schemas";

const router = Router();

router.get("/me", getCurrentUserHandler);
registry.registerPath({
  path: "/api/profile/me",
  method: "get",
  description: GET_PROFILE,
  tags: ["Profile"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [],
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

router.post("/me/password", updatePasswordHandler);
registry.registerPath({
  path: "/api/profile/me/password",
  method: "post",
  description: CHANGE_PASS,
  tags: ["Profile"],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [],
  request: {
    body: {
      content: {
        "application/json": {
          schema: UserPasswordUpdateSchema,
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
