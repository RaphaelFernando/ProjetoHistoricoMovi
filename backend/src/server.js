import { createApp } from "./app.js";
import { env } from "./shared/config/env.js";
import { initializeDatabase } from "./shared/database/database.js";

initializeDatabase();

createApp().listen(env.port, () => {
  console.log(`API REST rodando em http://localhost:${env.port}`);
});
