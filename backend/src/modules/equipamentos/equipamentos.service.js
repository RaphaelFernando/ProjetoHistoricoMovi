import {
  createEquipamento,
  findEquipamentoByEtiqueta,
  listEquipamentos
} from "./equipamentos.repository.js";
import { AppError } from "../../shared/errors/AppError.js";
import { clean } from "../../shared/utils/string.js";

export function cadastrarEquipamento(payload) {
  const data = {
    marca: clean(payload.marca),
    modelo: clean(payload.modelo),
    especificacoes: clean(payload.especificacoes),
    memoriaFisica: clean(payload.memoriaFisica),
    etiquetaServico: clean(payload.etiquetaServico),
    codigoServicoExpresso: clean(payload.codigoServicoExpresso)
  };

  if (!data.etiquetaServico) {
    throw new AppError("Informe a etiqueta de servico.", 400);
  }

  return createEquipamento(data);
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
