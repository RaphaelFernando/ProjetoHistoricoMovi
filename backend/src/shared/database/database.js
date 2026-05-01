import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

const databasePath = resolve(process.cwd(), process.env.DB_PATH || "./data/equipamentos.db");

mkdirSync(dirname(databasePath), { recursive: true });

export const db = new DatabaseSync(databasePath);
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
