import { db } from "../../shared/database/database.js";

function mapMovimentacao(row) {
  if (!row) {
    return null;
  }

  const anexoUrl = row.anexo_nome_original ? `/api/movimentacoes/${row.id}/anexo` : null;

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
    anexoUrl,
    anexo: row.anexo_nome_original ? {
      nomeOriginal: row.anexo_nome_original,
      nomeSalvo: row.anexo_nome_salvo,
      caminho: row.anexo_caminho,
      mimetype: row.anexo_mimetype,
      tamanho: row.anexo_tamanho,
      url: anexoUrl
    } : null,
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
      observacoes,
      anexo_nome_original,
      anexo_nome_salvo,
      anexo_caminho,
      anexo_mimetype,
      anexo_tamanho
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    data.equipamentoId,
    data.usuario,
    data.setor,
    data.loja,
    data.dataEntrada,
    data.tipoMovimentacao,
    data.entreguePor,
    data.recebidoPor,
    data.observacoes,
    data.anexoNomeOriginal,
    data.anexoNomeSalvo,
    data.anexoCaminho,
    data.anexoMimetype,
    data.anexoTamanho
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
      m.id AS movimentacao_id,
      e.id AS equipamento_id,
      e.marca,
      e.modelo,
      e.etiqueta_servico,
      m.usuario,
      m.setor,
      m.loja,
      m.data_entrada,
      m.anexo_nome_original,
      m.anexo_nome_salvo,
      m.anexo_caminho,
      m.anexo_mimetype,
      m.anexo_tamanho
    FROM equipamentos e
    INNER JOIN movimentacoes m ON e.id = m.equipamento_id
    WHERE m.data_saida IS NULL
    ORDER BY m.data_entrada DESC, e.marca, e.modelo
  `).all().map((row) => ({
    movimentacaoId: row.movimentacao_id,
    equipamentoId: row.equipamento_id,
    marca: row.marca,
    modelo: row.modelo,
    etiquetaServico: row.etiqueta_servico,
    usuario: row.usuario,
    setor: row.setor,
    loja: row.loja,
    dataEntrada: row.data_entrada,
    anexoUrl: row.anexo_nome_original ? `/api/movimentacoes/${row.movimentacao_id}/anexo` : null,
    anexo: row.anexo_nome_original ? {
      nomeOriginal: row.anexo_nome_original,
      nomeSalvo: row.anexo_nome_salvo,
      caminho: row.anexo_caminho,
      mimetype: row.anexo_mimetype,
      tamanho: row.anexo_tamanho,
      url: `/api/movimentacoes/${row.movimentacao_id}/anexo`
    } : null
  }));
}
