import { Router } from "express";

import { equipamentosRoutes } from "./modules/equipamentos/index.js";
import { movimentacoesRoutes } from "./modules/movimentacoes/index.js";

export const apiRoutes = Router();

apiRoutes.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRoutes.use("/equipamentos", equipamentosRoutes);
apiRoutes.use("/movimentacoes", movimentacoesRoutes);
