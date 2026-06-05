import { request } from "../../shared/services/httpClient.js";
import { env } from "../../shared/config/env.js";

function createMovimentacaoBody(payload, anexo) {
  if (!anexo) {
    return JSON.stringify(payload);
  }

  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value ?? "");
  });

  formData.append("anexo", anexo);

  return formData;
}

export const movimentacoesApi = {
  list: () => request("/movimentacoes"),
  create: (payload, anexo) => request("/movimentacoes", {
    method: "POST",
    body: createMovimentacaoBody(payload, anexo)
  }),
  close: (payload) => request("/movimentacoes/fechar", {
    method: "PATCH",
    body: JSON.stringify(payload)
  }),
  listCurrentStatus: () => request("/movimentacoes/situacao-atual")
};

export function getMovimentacaoAnexoUrl(movimentacao) {
  if (!movimentacao?.anexoUrl) {
    return null;
  }

  return new URL(movimentacao.anexoUrl, env.apiUrl).toString();
}
