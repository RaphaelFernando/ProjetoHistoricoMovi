import { equipamentosPageEntries } from "../features/equipamentos/index.js";
import { movimentacoesPageEntries } from "../features/movimentacoes/index.js";

export const pageEntries = [
  ...equipamentosPageEntries,
  ...movimentacoesPageEntries
];

export const pages = Object.fromEntries(pageEntries);
