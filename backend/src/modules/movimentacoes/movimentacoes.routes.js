import { Router } from "express";

import * as movimentacaoController from "./movimentacoes.controller.js";
import { movimentacoesUpload } from "./movimentacoes.upload.js";

const router = Router();

router.get("/", movimentacaoController.index);
router.get("/:id/anexo", movimentacaoController.anexo);
router.get("/situacao-atual", movimentacaoController.situacaoAtual);
router.post("/", movimentacoesUpload.single("anexo"), movimentacaoController.store);
router.patch("/fechar", movimentacaoController.fechar);

export default router;
