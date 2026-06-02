import { useCallback } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { DataTable } from "../../../shared/components/DataTable.jsx";
import { useAsyncData } from "../../../shared/hooks/useAsyncData.js";
import { equipamentosApi } from "../equipamentosApi.js";

const columns = [
  { key: "id", label: "ID" },
  { key: "marca", label: "Marca" },
  { key: "modelo", label: "Modelo" },
  { key: "especificacoes", label: "Especificacoes" },
  { key: "memoriaFisica", label: "Memoria fisica" },
  { key: "etiquetaServico", label: "Etiqueta" },
  { key: "codigoServicoExpresso", label: "Codigo expresso" }
];

export function EquipmentListPage() {
  const loader = useCallback(() => equipamentosApi.list(), []);
  const { data, error, loading } = useAsyncData(loader);

  return (
    <section className="panel">
      <Alert type="error">{error}</Alert>
      {loading ? <p className="empty-state">Carregando...</p> : (
        <DataTable columns={columns} rows={data} emptyMessage="Nenhum equipamento cadastrado." />
      )}
    </section>
  );
}
