import React from 'react';

import { useCallback } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { DataTable } from "../../../shared/components/DataTable.jsx";
import { useAsyncData } from "../../../shared/hooks/useAsyncData.js";
import { movimentacoesApi } from "../movimentacoesApi.js";

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
  { key: "observacoes", label: "Observacoes" }
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
