import { useCallback } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { DataTable } from "../../../shared/components/DataTable.jsx";
import { useAsyncData } from "../../../shared/hooks/useAsyncData.js";
import { movimentacoesApi } from "../movimentacoesApi.js";

const columns = [
  { key: "equipamentoId", label: "Equipamento ID" },
  { key: "marca", label: "Marca" },
  { key: "modelo", label: "Modelo" },
  { key: "etiquetaServico", label: "Etiqueta" },
  { key: "usuario", label: "Usuario atual" },
  { key: "setor", label: "Setor" },
  { key: "loja", label: "Loja" },
  { key: "dataEntrada", label: "Data de entrada" }
];

export function CurrentStatusPage() {
  const loader = useCallback(() => movimentacoesApi.listCurrentStatus(), []);
  const { data, error, loading } = useAsyncData(loader);

  return (
    <section className="panel">
      <Alert type="error">{error}</Alert>
      {loading ? <p className="empty-state">Carregando...</p> : (
        <DataTable columns={columns} rows={data} emptyMessage="Nenhum equipamento esta em uso no momento." />
      )}
    </section>
  );
}
