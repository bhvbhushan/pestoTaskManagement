import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: ".env",
});

/* Declare all the environment variables here */
const envVariables = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
