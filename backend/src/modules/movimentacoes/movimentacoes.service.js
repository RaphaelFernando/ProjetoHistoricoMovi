import { findEquipamentoByEtiqueta } from "../equipamentos/equipamentos.repository.js";
import {
  closeMovimentacao,
  createMovimentacao,
  findMovimentacaoAberta,
  listMovimentacoes,
  listSituacaoAtual
} from "./movimentacoes.repository.js";
import { AppError } from "../../shared/errors/AppError.js";
import { clean } from "../../shared/utils/string.js";

export function registrarMovimentacao(payload) {
  const etiquetaServico = clean(payload.etiquetaServico);
  const equipamento = findEquipamentoByEtiqueta(etiquetaServico);

  if (!equipamento) {
    throw new AppError("Nao foi possivel registrar: equipamento nao encontrado para essa etiqueta.", 404);
  }

  if (findMovimentacaoAberta(equipamento.id)) {
    throw new AppError("Nao foi possivel registrar: este equipamento ja esta em uso.", 409);
  }

  const data = {
    equipamentoId: equipamento.id,
    usuario: clean(payload.usuario),
    setor: clean(payload.setor),
    loja: clean(payload.loja),
    dataEntrada: clean(payload.dataEntrada),
    tipoMovimentacao: clean(payload.tipoMovimentacao) || "ENTREGA",
    entreguePor: clean(payload.entreguePor),
    recebidoPor: clean(payload.recebidoPor),
    observacoes: clean(payload.observacoes)
  };

  if (!data.dataEntrada) {
    throw new AppError("Informe a data de entrada.", 400);
  }

  return createMovimentacao(data);
}

export function fecharMovimentacao(payload) {
  const etiquetaServico = clean(payload.etiquetaServico);
  const dataSaida = clean(payload.dataSaida);
  const equipamento = findEquipamentoByEtiqueta(etiquetaServico);

  if (!equipamento) {
    throw new AppError("Nao foi possivel fechar: equipamento nao encontrado para essa etiqueta.", 404);
  }

  if (!dataSaida) {
    throw new AppError("Informe a data de saida.", 400);
  }

  const movimentacaoAberta = findMovimentacaoAberta(equipamento.id);

  if (!movimentacaoAberta) {
    throw new AppError("Nao existe movimentacao aberta para esse equipamento.", 404);
  }

  return closeMovimentacao(movimentacaoAberta.id, dataSaida);
}

export function listarMovimentacoes() {
  return listMovimentacoes();
}

export function listarSituacaoAtual() {
  return listSituacaoAtual();
}
