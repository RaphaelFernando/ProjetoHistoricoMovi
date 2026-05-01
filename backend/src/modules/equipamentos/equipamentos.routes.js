import { Router } from "express";

import * as equipamentoController from "./equipamentos.controller.js";

const router = Router();

router.get("/", equipamentoController.index);
router.get("/:etiquetaServico", equipamentoController.show);
router.post("/", equipamentoController.store);

export default router;
