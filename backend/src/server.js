import "dotenv/config";

import { createApp } from "./app.js";
import { initializeDatabase } from "./shared/database/database.js";

const port = Number(process.env.PORT || 3333);

initializeDatabase();

createApp().listen(port, () => {
  console.log(`API REST rodando em http://localhost:${port}`);
});
