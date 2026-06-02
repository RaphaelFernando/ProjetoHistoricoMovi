import cors from "cors";
import express from "express";

import { apiRoutes } from "./routes.js";
import { env } from "./shared/config/env.js";
import { errorHandler } from "./shared/http/errorHandler.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.frontendOrigin }));
  app.use(express.json());

  app.use("/api", apiRoutes);

  app.use((_req, res) => {
    res.status(404).json({ message: "Rota nao encontrada." });
  });

  app.use(errorHandler);

  return app;
}
