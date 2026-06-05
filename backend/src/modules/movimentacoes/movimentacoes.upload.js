import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { extname, resolve } from "node:path";

import multer from "multer";

import { AppError } from "../../shared/errors/AppError.js";
import { env } from "../../shared/config/env.js";

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);

const uploadDirectory = resolve(env.backendRoot, "uploads/movimentacoes");

mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (_req, file, callback) => {
    callback(null, `${Date.now()}-${randomUUID()}${extname(file.originalname).toLowerCase()}`);
  }
});

function fileFilter(_req, file, callback) {
  if (!allowedMimeTypes.has(file.mimetype)) {
    callback(new AppError("Anexo invalido. Envie apenas PDF, DOC ou DOCX.", 400));
    return;
  }

  callback(null, true);
}

export const movimentacoesUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});
