import { existsSync, unlinkSync } from "node:fs";
import { isAbsolute, relative, resolve } from "node:path";

import { findEquipamentoByEtiqueta } from "../equipamentos/equipamentos.repository.js";
import {
  closeMovimentacao,
  createMovimentacao,
  findMovimentacaoAberta,
  findMovimentacaoById,
  listMovimentacoes,
  listSituacaoAtual
} from "./movimentacoes.repository.js";
import { AppError } from "../../shared/errors/AppError.js";
import { env } from "../../shared/config/env.js";
import { clean } from "../../shared/utils/string.js";

function buildAnexoData(file) {
  if (!file) {
    return {
      anexoNomeOriginal: null,
      anexoNomeSalvo: null,
      anexoCaminho: null,
      anexoMimetype: null,
      anexoTamanho: null
    };
  }

  return {
    anexoNomeOriginal: file.originalname,
    anexoNomeSalvo: file.filename,
    anexoCaminho: relative(env.backendRoot, file.path).replaceAll("\\", "/"),
    anexoMimetype: file.mimetype,
    anexoTamanho: file.size
  };
}

function removeUploadedFile(file) {
  if (!file?.path) {
    return;
  }

  try {
    unlinkSync(file.path);
  } catch {
    // Ignore cleanup errors to preserve the original failure reason.
  }
}

function resolveAnexoPath(anexoCaminho) {
  const uploadsRoot = resolve(env.backendRoot, "uploads/movimentacoes");
  const filePath = resolve(env.backendRoot, anexoCaminho || "");
  const relativePath = relative(uploadsRoot, filePath);

  if (!anexoCaminho || isAbsolute(anexoCaminho) || relativePath.startsWith("..") || !relativePath) {
    throw new AppError("Anexo nao encontrado.", 404);
  }

  return filePath;
}

export function registrarMovimentacao(payload, file) {
  try {
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
      observacoes: clean(payload.observacoes),
      ...buildAnexoData(file)
    };

    if (!data.dataEntrada) {
      throw new AppError("Informe a data de entrada.", 400);
    }

    return createMovimentacao(data);
  } catch (error) {
    removeUploadedFile(file);
    throw error;
  }
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

export function buscarAnexoMovimentacao(id) {
  const movimentacao = findMovimentacaoById(Number(id));

  if (!movimentacao) {
    throw new AppError("Movimentacao nao encontrada.", 404);
  }

  if (!movimentacao.anexo) {
    throw new AppError("Nao existe anexo para esta movimentacao.", 404);
  }

  const filePath = resolveAnexoPath(movimentacao.anexo.caminho);

  if (!existsSync(filePath)) {
    throw new AppError("Arquivo do anexo nao encontrado.", 404);
  }

  return {
    filePath,
    nomeOriginal: movimentacao.anexo.nomeOriginal,
    mimetype: movimentacao.anexo.mimetype
  };
}
