import {
  buscarEquipamentoPorEtiqueta,
  cadastrarEquipamento,
  listarEquipamentos
} from "./equipamentos.service.js";

export function index(_req, res) {
  res.json(listarEquipamentos());
}

export function show(req, res) {
  res.json(buscarEquipamentoPorEtiqueta(req.params.etiquetaServico));
}

export function store(req, res) {
  const equipamento = cadastrarEquipamento(req.body);
  res.status(201).json({
    message: "Equipamento cadastrado com sucesso!",
    data: equipamento
  });
}
