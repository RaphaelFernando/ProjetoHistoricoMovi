import { useState } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { Button } from "../../../shared/components/Button.jsx";
import { Field } from "../../../shared/components/Field.jsx";
import { movimentacoesApi } from "../movimentacoesApi.js";

const today = new Date().toISOString().slice(0, 10);

const initialForm = {
  etiquetaServico: "",
  usuario: "",
  setor: "",
  loja: "",
  dataEntrada: today,
  tipoMovimentacao: "ENTREGA",
  entreguePor: "",
  recebidoPor: "",
  observacoes: ""
};

export function MovementFormPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.etiquetaServico.trim() || !form.dataEntrada) {
      setError("Informe etiqueta de servico e data de entrada.");
      return;
    }

    setSaving(true);
    try {
      const response = await movimentacoesApi.create(form);
      setMessage(response.message);
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <Alert type="success">{message}</Alert>
      <Alert type="error">{error}</Alert>

      <form className="form-grid" onSubmit={handleSubmit}>
        <Field label="Etiqueta de servico">
          <input name="etiquetaServico" value={form.etiquetaServico} onChange={updateField} required />
        </Field>
        <Field label="Usuario">
          <input name="usuario" value={form.usuario} onChange={updateField} />
        </Field>
        <Field label="Setor">
          <input name="setor" value={form.setor} onChange={updateField} />
        </Field>
        <Field label="Loja">
          <input name="loja" value={form.loja} onChange={updateField} />
        </Field>
        <Field label="Data de entrada">
          <input type="date" name="dataEntrada" value={form.dataEntrada} onChange={updateField} required />
        </Field>
        <Field label="Tipo de movimentacao">
          <input name="tipoMovimentacao" value={form.tipoMovimentacao} onChange={updateField} />
        </Field>
        <Field label="Entregue por">
          <input name="entreguePor" value={form.entreguePor} onChange={updateField} />
        </Field>
        <Field label="Recebido por">
          <input name="recebidoPor" value={form.recebidoPor} onChange={updateField} />
        </Field>
        <Field label="Observacoes">
          <textarea name="observacoes" value={form.observacoes} onChange={updateField} rows="4" />
        </Field>
        <div className="form-actions">
          <Button disabled={saving}>{saving ? "Registrando..." : "Registrar"}</Button>
        </div>
      </form>
    </section>
  );
}
