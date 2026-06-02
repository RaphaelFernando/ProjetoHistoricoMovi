import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

import { env } from "../config/env.js";

mkdirSync(dirname(env.dbPath), { recursive: true });

export const db = new DatabaseSync(env.dbPath);
db.exec("PRAGMA foreign_keys = ON");

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
      FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id)
    );
  `);
}
