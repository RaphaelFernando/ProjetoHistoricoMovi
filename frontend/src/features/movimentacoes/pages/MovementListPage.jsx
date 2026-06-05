import { useCallback } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { DataTable } from "../../../shared/components/DataTable.jsx";
import { useAsyncData } from "../../../shared/hooks/useAsyncData.js";
import { getMovimentacaoAnexoUrl, movimentacoesApi } from "../movimentacoesApi.js";

const columns = [
  { key: "id", label: "ID" },
  { key: "equipamento", label: "Equipamento", render: (row) => row.equipamento?.etiquetaServico || row.equipamentoId },
  { key: "usuario", label: "Usuario" },
  { key: "setor", label: "Setor" },
  { key: "loja", label: "Loja" },
  { key: "dataEntrada", label: "Entrada" },
  { key: "dataSaida", label: "Saida" },
  { key: "tipoMovimentacao", label: "Tipo" },
  { key: "entreguePor", label: "Entregue por" },
  { key: "recebidoPor", label: "Recebido por" },
  { key: "observacoes", label: "Observacoes" },
  {
    key: "documento",
    label: "Documento",
    render: (row) => {
      const anexoUrl = getMovimentacaoAnexoUrl(row);
      return anexoUrl ? (
        <a className="table-link" href={anexoUrl} target="_blank" rel="noopener noreferrer">
          Visualizar
        </a>
      ) : "-";
    }
  }
];

export function MovementListPage() {
  const loader = useCallback(() => movimentacoesApi.list(), []);
  const { data, error, loading } = useAsyncData(loader);

  return (
    <section className="panel">
      <Alert type="error">{error}</Alert>
      {loading ? <p className="empty-state">Carregando...</p> : (
        <DataTable columns={columns} rows={data} emptyMessage="Nenhuma movimentacao cadastrada." />
      )}
    </section>
  );
}
