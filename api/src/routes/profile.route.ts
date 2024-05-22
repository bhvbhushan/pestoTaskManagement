import { Router } from "express";
import { registry } from "@/registry";
import {
  getAllTaskHandler,
  getCurrentUserHandler,
  updatePasswordHandler,
} from "@/controllers";
import {
  GET_PROFILE,
  SUCC,
  BAD_REQ,
  INVALID_INPUT,
  NOT_FOUND,
  USER_NOT_FOUND,
  CHANGE_PASS,
  TASKS_PROFILE_PATH,
  PROFILE_PATH,
  GET,
  PROFILE,
  STR,
  OBJ,
} from "@/constants";
import {
  TasksResponseSchema,
  UserPasswordUpdateSchema,
  UserResponseSchema,
} from "@/schemas";

const router = Router();

router.get("/me", getCurrentUserHandler);
registry.registerPath({
  path: PROFILE_PATH,
  method: GET,
  description: GET_PROFILE,
  tags: [PROFILE],
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
            type: OBJ,
            properties: {
              message: { type: STR, example: INVALID_INPUT },
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

router.get("/me/tasks", getAllTaskHandler);
registry.registerPath({
  path: TASKS_PROFILE_PATH,
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
          schema: TasksResponseSchema,
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
