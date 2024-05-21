import { API_NAME, API_VERSION, OPENAPI_VERSION } from "./constants";

const swaggerOptions = {
  definition: {
    openapi: OPENAPI_VERSION,
    info: {
      title: API_NAME,
      version: API_VERSION,
    },
    schemas: ["http", "https"],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`,
        description: "Localhost",
      },
    ],
  },
  apis: ["src/routes/**/*.ts", "src/schemas/**/*.ts"],
};

export default swaggerOptions;
