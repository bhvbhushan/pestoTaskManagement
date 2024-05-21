import "./env";

import http from "http";
import app from "./app";
import { Logger } from "@/utils";

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  Logger.info("Database URL: " + process.env.DATABASE_URL);
  Logger.info(`[server]: Server is listening on PORT ${PORT}`);
});
