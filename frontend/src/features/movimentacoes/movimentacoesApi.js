import { request } from "../../shared/services/httpClient.js";

export const movimentacoesApi = {
  list: () => request("/movimentacoes"),
  create: (payload) => request("/movimentacoes", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  close: (payload) => request("/movimentacoes/fechar", {
    method: "PATCH",
    body: JSON.stringify(payload)
  }),
  listCurrentStatus: () => request("/movimentacoes/situacao-atual")
};
