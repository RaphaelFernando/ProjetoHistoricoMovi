import "dotenv/config";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const backendRoot = resolve(currentDir, "../../..");

function readNumber(value, fallback) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

export const env = Object.freeze({
  backendRoot,
  dbPath: resolve(backendRoot, process.env.DB_PATH || "./data/equipamentos.db"),
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  port: readNumber(process.env.PORT, 3333)
});
