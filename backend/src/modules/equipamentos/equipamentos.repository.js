import { db } from "../../shared/database/database.js";

function mapEquipamento(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    marca: row.marca,
    modelo: row.modelo,
    especificacoes: row.especificacoes,
    memoriaFisica: row.memoria_fisica,
    etiquetaServico: row.etiqueta_servico,
    codigoServicoExpresso: row.codigo_servico_expresso
  };
}

export function createEquipamento(data) {
  const result = db.prepare(`
    INSERT INTO equipamentos (
      marca,
      modelo,
      especificacoes,
      memoria_fisica,
      etiqueta_servico,
      codigo_servico_expresso
    ) VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    data.marca,
    data.modelo,
    data.especificacoes,
    data.memoriaFisica,
    data.etiquetaServico,
    data.codigoServicoExpresso
  );

  return findEquipamentoById(Number(result.lastInsertRowid));
}

export function updateEquipamento(id, data) {
  db.prepare(`
    UPDATE equipamentos
    SET
      marca = ?,
      modelo = ?,
      especificacoes = ?,
      memoria_fisica = ?,
      etiqueta_servico = ?,
      codigo_servico_expresso = ?
    WHERE id = ?
  `).run(
    data.marca,
    data.modelo,
    data.especificacoes,
    data.memoriaFisica,
    data.etiquetaServico,
    data.codigoServicoExpresso,
    id
  );

  return findEquipamentoById(id);
}

export function findEquipamentoById(id) {
  return mapEquipamento(
    db.prepare("SELECT * FROM equipamentos WHERE id = ?").get(id)
  );
}

export function findEquipamentoByEtiqueta(etiquetaServico) {
  return mapEquipamento(
    db.prepare("SELECT * FROM equipamentos WHERE etiqueta_servico = ?").get(etiquetaServico)
  );
}

export function listEquipamentos() {
  return db.prepare(`
    SELECT *
    FROM equipamentos
    ORDER BY marca, modelo, etiqueta_servico
  `).all().map(mapEquipamento);
}
