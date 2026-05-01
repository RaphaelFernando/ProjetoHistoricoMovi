import { request } from "../../shared/services/httpClient.js";

export const equipamentosApi = {
  list: () => request("/equipamentos"),
  create: (payload) => request("/equipamentos", {
    method: "POST",
    body: JSON.stringify(payload)
  }),
  findByEtiqueta: (etiquetaServico) => request(`/equipamentos/${encodeURIComponent(etiquetaServico)}`)
};
