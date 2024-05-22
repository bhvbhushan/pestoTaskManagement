import { Router } from "express";
import { registry } from "@/registry";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  updateTaskHandler,
} from "@/controllers";
import {
  TASK_PATH,
  CREATE_TASK,
  POST,
  TASK,
  SUCC,
  OBJ,
  STR,
  INVALID_INPUT,
  BAD_REQ,
  NOT_FOUND,
  USER_NOT_FOUND,
  TASK_BY_ID_PATH,
  PUT,
  UPDATE_TASK,
  GET,
  GET_TASK_BY_ID,
  DELETE,
  DELETE_TASK,
} from "@/constants";
import {
  TaskCreateSchema,
  TaskResponseSchema,
  TaskUpdateSchema,
} from "@/schemas";

const router = Router();

router.post("/", createTaskHandler);
registry.registerPath({
  path: TASK_PATH,
  method: POST,
  description: CREATE_TASK,
  tags: [TASK],
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
          schema: TaskCreateSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: SUCC,
      content: {
        "application/json": {
          schema: TaskResponseSchema,
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

router.put("/:id", updateTaskHandler);
registry.registerPath({
  path: TASK_BY_ID_PATH,
  method: PUT,
  description: UPDATE_TASK,
  tags: [TASK],
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
          schema: TaskUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: SUCC,
      content: {
        "application/json": {
          schema: TaskResponseSchema,
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

router.get("/:id", getTaskByIdHandler);
registry.registerPath({
  path: TASK_BY_ID_PATH,
  method: GET,
  description: GET_TASK_BY_ID,
  tags: [TASK],
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
  responses: {
    200: {
      description: SUCC,
      content: {
        "application/json": {
          schema: TaskResponseSchema,
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

router.delete("/:id", deleteTaskHandler);
registry.registerPath({
  path: TASK_BY_ID_PATH,
  method: DELETE,
  description: DELETE_TASK,
  tags: [TASK],
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
  responses: {
    200: {
      description: SUCC,
      content: {
        "application/json": {
          schema: TaskResponseSchema,
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

export default router;
