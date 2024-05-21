import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { customMorgan } from "@/middlewares";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import swaggerOptions from "./swagger";
import {
  Logger,
  BadRequest,
  NotAuthenticated,
  NotAuthorized,
  NotFound,
} from "@/utils";
import { z } from "zod";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(customMorgan);

import { generateAPIDocs } from "./registry";

const apiDocs = generateAPIDocs();
console.log("API Docs: ", JSON.stringify(apiDocs, null, 2));

const swaggerSpec = swaggerJSDoc(swaggerOptions);
// console.log('Swagger Spec: ', JSON.stringify(swaggerSpec, null, 2));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));

app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use((_req, _res, next) => {
  next(new NotFound());
});

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  Logger.error(error.message);
  console.error(error);

  if (error instanceof NotFound) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      path: req.path,
      method: req.method,
    });
  }

  if (error instanceof BadRequest) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error.data,
      path: req.path,
      method: req.method,
    });
  }

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      data: error.issues,
      path: req.path,
      method: req.method,
    });
  }

  if (error instanceof NotAuthenticated) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }

  if (error instanceof NotAuthorized) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    path: req.path,
    method: req.method,
  });
});

export default app;
