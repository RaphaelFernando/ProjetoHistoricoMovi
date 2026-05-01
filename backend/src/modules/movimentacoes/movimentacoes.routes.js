import { Router } from "express";

import * as movimentacaoController from "./movimentacoes.controller.js";

const router = Router();

router.get("/", movimentacaoController.index);
router.get("/situacao-atual", movimentacaoController.situacaoAtual);
router.post("/", movimentacaoController.store);
router.patch("/fechar", movimentacaoController.fechar);

export default router;
