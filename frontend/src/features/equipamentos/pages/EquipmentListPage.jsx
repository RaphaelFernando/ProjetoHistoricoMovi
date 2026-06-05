import { useCallback, useMemo, useState } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { Button } from "../../../shared/components/Button.jsx";
import { DataTable } from "../../../shared/components/DataTable.jsx";
import { Field } from "../../../shared/components/Field.jsx";
import { useAsyncData } from "../../../shared/hooks/useAsyncData.js";
import { equipamentosApi } from "../equipamentosApi.js";

const initialForm = {
  marca: "",
  modelo: "",
  especificacoes: "",
  memoriaFisica: "",
  etiquetaServico: "",
  codigoServicoExpresso: ""
};

function mapEquipamentoToForm(equipamento) {
  return {
    marca: equipamento.marca || "",
    modelo: equipamento.modelo || "",
    especificacoes: equipamento.especificacoes || "",
    memoriaFisica: equipamento.memoriaFisica || "",
    etiquetaServico: equipamento.etiquetaServico || "",
    codigoServicoExpresso: equipamento.codigoServicoExpresso || ""
  };
}

export function EquipmentListPage() {
  const loader = useCallback(() => equipamentosApi.list(), []);
  const { data, error, loading, reload } = useAsyncData(loader);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [editError, setEditError] = useState("");
  const [saving, setSaving] = useState(false);

  const columns = useMemo(() => ([
    { key: "id", label: "ID" },
    { key: "marca", label: "Marca" },
    { key: "modelo", label: "Modelo" },
    { key: "especificacoes", label: "Especificacoes" },
    { key: "memoriaFisica", label: "Memoria fisica" },
    { key: "etiquetaServico", label: "Etiqueta" },
    { key: "codigoServicoExpresso", label: "Codigo expresso" },
    {
      key: "acoes",
      label: "Acoes",
      render: (row) => (
        <Button type="button" variant="secondary" onClick={() => openEditor(row)}>
          Editar
        </Button>
      )
    }
  ]), []);

  function openEditor(equipamento) {
    setEditingEquipment(equipamento);
    setForm(mapEquipamentoToForm(equipamento));
    setEditError("");
    setMessage("");
  }

  function closeEditor() {
    setEditingEquipment(null);
    setForm(initialForm);
    setEditError("");
    setSaving(false);
  }

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setEditError("");
    setMessage("");

    if (!form.etiquetaServico.trim()) {
      setEditError("Informe a etiqueta de servico.");
      return;
    }

    setSaving(true);
    try {
      const response = await equipamentosApi.update(editingEquipment.id, form);
      await reload();
      setMessage(response.message);
      closeEditor();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <Alert type="success">{message}</Alert>
      <Alert type="error">{error}</Alert>
      {loading ? <p className="empty-state">Carregando...</p> : (
        <DataTable columns={columns} rows={data} emptyMessage="Nenhum equipamento cadastrado." />
      )}

      {editingEquipment && (
        <div className="modal-backdrop" role="presentation">
          <section className="modal-panel" aria-modal="true" role="dialog" aria-labelledby="editar-equipamento-titulo">
            <div className="modal-header">
              <div>
                <p className="modal-eyebrow">Equipamentos cadastrados</p>
                <h2 id="editar-equipamento-titulo">Editar equipamento</h2>
              </div>
              <button className="modal-close" type="button" onClick={closeEditor} aria-label="Fechar edicao">
                ×
              </button>
            </div>

            <Alert type="error">{editError}</Alert>

            <form className="form-grid" onSubmit={handleSubmit}>
              <Field label="Marca">
                <input name="marca" value={form.marca} onChange={updateField} />
              </Field>
              <Field label="Modelo">
                <input name="modelo" value={form.modelo} onChange={updateField} />
              </Field>
              <Field label="Especificacoes">
                <input name="especificacoes" value={form.especificacoes} onChange={updateField} />
              </Field>
              <Field label="Memoria fisica">
                <input name="memoriaFisica" value={form.memoriaFisica} onChange={updateField} />
              </Field>
              <Field label="Etiqueta de servico">
                <input name="etiquetaServico" value={form.etiquetaServico} onChange={updateField} required />
              </Field>
              <Field label="Codigo de servico expresso">
                <input name="codigoServicoExpresso" value={form.codigoServicoExpresso} onChange={updateField} />
              </Field>
              <div className="form-actions modal-actions">
                <Button type="button" variant="secondary" onClick={closeEditor}>
                  Cancelar
                </Button>
                <Button disabled={saving}>{saving ? "Salvando..." : "Salvar alteracoes"}</Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </section>
  );
}
