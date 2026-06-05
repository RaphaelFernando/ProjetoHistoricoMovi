import {
  buscarAnexoMovimentacao,
  fecharMovimentacao,
  listarMovimentacoes,
  listarSituacaoAtual,
  registrarMovimentacao
} from "./movimentacoes.service.js";

export function index(_req, res) {
  res.json(listarMovimentacoes());
}

export function situacaoAtual(_req, res) {
  res.json(listarSituacaoAtual());
}

export function anexo(req, res) {
  const { filePath, nomeOriginal, mimetype } = buscarAnexoMovimentacao(req.params.id);
  res.setHeader("Content-Disposition", `inline; filename*=UTF-8''${encodeURIComponent(nomeOriginal)}`);
  res.type(mimetype);
  res.sendFile(filePath);
}

export function store(req, res) {
  const movimentacao = registrarMovimentacao(req.body, req.file);
  res.status(201).json({
    message: "Movimentacao registrada com sucesso!",
    data: movimentacao
  });
}

export function fechar(req, res) {
  const movimentacao = fecharMovimentacao(req.body);
  res.json({
    message: "Movimentacao fechada com sucesso!",
    data: movimentacao
  });
}
