import { Router } from "express";

import equipamentosRoutes from "./modules/equipamentos/equipamentos.routes.js";
import movimentacoesRoutes from "./modules/movimentacoes/movimentacoes.routes.js";

export const apiRoutes = Router();

apiRoutes.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRoutes.use("/equipamentos", equipamentosRoutes);
apiRoutes.use("/movimentacoes", movimentacoesRoutes);
