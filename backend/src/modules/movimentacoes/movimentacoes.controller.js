import {
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

export function store(req, res) {
  const movimentacao = registrarMovimentacao(req.body);
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
