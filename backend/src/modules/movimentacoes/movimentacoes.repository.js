import { db } from "../../shared/database/database.js";

function mapMovimentacao(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    equipamentoId: row.equipamento_id,
    usuario: row.usuario,
    setor: row.setor,
    loja: row.loja,
    dataEntrada: row.data_entrada,
    dataSaida: row.data_saida,
    tipoMovimentacao: row.tipo_movimentacao,
    entreguePor: row.entregue_por,
    recebidoPor: row.recebido_por,
    observacoes: row.observacoes,
    equipamento: row.etiqueta_servico ? {
      marca: row.marca,
      modelo: row.modelo,
      etiquetaServico: row.etiqueta_servico
    } : undefined
  };
}

export function createMovimentacao(data) {
  const result = db.prepare(`
    INSERT INTO movimentacoes (
      equipamento_id,
      usuario,
      setor,
      loja,
      data_entrada,
      tipo_movimentacao,
      entregue_por,
      recebido_por,
      observacoes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.equipamentoId,
    data.usuario,
    data.setor,
    data.loja,
    data.dataEntrada,
    data.tipoMovimentacao,
    data.entreguePor,
    data.recebidoPor,
    data.observacoes
  );

  return findMovimentacaoById(Number(result.lastInsertRowid));
}

export function findMovimentacaoAberta(equipamentoId) {
  return mapMovimentacao(
    db.prepare(`
      SELECT *
      FROM movimentacoes
      WHERE equipamento_id = ? AND data_saida IS NULL
    `).get(equipamentoId)
  );
}

export function findMovimentacaoById(id) {
  return mapMovimentacao(
    db.prepare("SELECT * FROM movimentacoes WHERE id = ?").get(id)
  );
}

export function listMovimentacoes() {
  return db.prepare(`
    SELECT
      m.*,
      e.marca,
      e.modelo,
      e.etiqueta_servico
    FROM movimentacoes m
    INNER JOIN equipamentos e ON e.id = m.equipamento_id
    ORDER BY m.data_entrada DESC, m.id DESC
  `).all().map(mapMovimentacao);
}

export function closeMovimentacao(id, dataSaida) {
  db.prepare(`
    UPDATE movimentacoes
    SET data_saida = ?
    WHERE id = ?
  `).run(dataSaida, id);

  return findMovimentacaoById(id);
}

export function listSituacaoAtual() {
  return db.prepare(`
    SELECT
      e.id AS equipamento_id,
      e.marca,
      e.modelo,
      e.etiqueta_servico,
      m.usuario,
      m.setor,
      m.loja,
      m.data_entrada
    FROM equipamentos e
    INNER JOIN movimentacoes m ON e.id = m.equipamento_id
    WHERE m.data_saida IS NULL
    ORDER BY m.data_entrada DESC, e.marca, e.modelo
  `).all().map((row) => ({
    equipamentoId: row.equipamento_id,
    marca: row.marca,
    modelo: row.modelo,
    etiquetaServico: row.etiqueta_servico,
    usuario: row.usuario,
    setor: row.setor,
    loja: row.loja,
    dataEntrada: row.data_entrada
  }));
}
