import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

import { env } from "../config/env.js";

mkdirSync(dirname(env.dbPath), { recursive: true });

export const db = new DatabaseSync(env.dbPath);
db.exec("PRAGMA foreign_keys = ON");

const movimentacoesAttachmentColumns = [
  ["anexo_nome_original", "TEXT"],
  ["anexo_nome_salvo", "TEXT"],
  ["anexo_caminho", "TEXT"],
  ["anexo_mimetype", "TEXT"],
  ["anexo_tamanho", "INTEGER"]
];

function ensureColumns(tableName, columns) {
  const existingColumns = new Set(
    db.prepare(`PRAGMA table_info(${tableName})`).all().map((column) => column.name)
  );

  columns.forEach(([name, type]) => {
    if (!existingColumns.has(name)) {
      db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${name} ${type}`);
    }
  });
}

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS equipamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      marca TEXT,
      modelo TEXT,
      especificacoes TEXT,
      memoria_fisica TEXT,
      etiqueta_servico TEXT UNIQUE,
      codigo_servico_expresso TEXT
    );

    CREATE TABLE IF NOT EXISTS movimentacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      equipamento_id INTEGER,
      usuario TEXT,
      setor TEXT,
      loja TEXT,
      data_entrada TEXT,
      data_saida TEXT,
      tipo_movimentacao TEXT,
      entregue_por TEXT,
      recebido_por TEXT,
      observacoes TEXT,
      anexo_nome_original TEXT,
      anexo_nome_salvo TEXT,
      anexo_caminho TEXT,
      anexo_mimetype TEXT,
      anexo_tamanho INTEGER,
      FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id)
    );
  `);

  ensureColumns("movimentacoes", movimentacoesAttachmentColumns);
}
