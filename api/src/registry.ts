import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { API_NAME, API_VERSION, OPENAPI_VERSION } from "./constants";

export const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

export const generateAPIDocs = () => {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: OPENAPI_VERSION,
    info: {
      title: API_NAME,
      version: API_VERSION,
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:8085`,
        description: "Localhost",
      },
    ],
  });
};
