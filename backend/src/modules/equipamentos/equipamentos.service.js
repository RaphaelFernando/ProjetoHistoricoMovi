import {
  createEquipamento,
  findEquipamentoById,
  findEquipamentoByEtiqueta,
  listEquipamentos,
  updateEquipamento
} from "./equipamentos.repository.js";
import { AppError } from "../../shared/errors/AppError.js";
import { clean } from "../../shared/utils/string.js";

function buildEquipamentoData(payload) {
  return {
    marca: clean(payload.marca),
    modelo: clean(payload.modelo),
    especificacoes: clean(payload.especificacoes),
    memoriaFisica: clean(payload.memoriaFisica),
    etiquetaServico: clean(payload.etiquetaServico),
    codigoServicoExpresso: clean(payload.codigoServicoExpresso)
  };
}

export function cadastrarEquipamento(payload) {
  const data = buildEquipamentoData(payload);

  if (!data.etiquetaServico) {
    throw new AppError("Informe a etiqueta de servico.", 400);
  }

  return createEquipamento(data);
}

export function atualizarEquipamento(id, payload) {
  const parsedId = Number(id);
  const equipamentoAtual = findEquipamentoById(parsedId);

  if (!equipamentoAtual) {
    throw new AppError("Equipamento nao encontrado.", 404);
  }

  const data = buildEquipamentoData(payload);

  if (!data.etiquetaServico) {
    throw new AppError("Informe a etiqueta de servico.", 400);
  }

  const equipamentoComMesmaEtiqueta = findEquipamentoByEtiqueta(data.etiquetaServico);

  if (equipamentoComMesmaEtiqueta && equipamentoComMesmaEtiqueta.id !== parsedId) {
    throw new AppError("Ja existe um equipamento com essa etiqueta de servico.", 409);
  }

  return updateEquipamento(parsedId, data);
}

export function buscarEquipamentoPorEtiqueta(etiquetaServico) {
  const equipamento = findEquipamentoByEtiqueta(clean(etiquetaServico));

  if (!equipamento) {
    throw new AppError("Equipamento nao encontrado.", 404);
  }

  return equipamento;
}

export function listarEquipamentos() {
  return listEquipamentos();
}
