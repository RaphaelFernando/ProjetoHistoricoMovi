export function errorHandler(error, _req, res, _next) {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error.code === "ERR_SQLITE_CONSTRAINT_UNIQUE") {
    return res.status(409).json({ message: "Ja existe um equipamento com essa etiqueta de servico." });
  }

  console.error(error);
  return res.status(500).json({ message: "Erro interno do servidor." });
}
