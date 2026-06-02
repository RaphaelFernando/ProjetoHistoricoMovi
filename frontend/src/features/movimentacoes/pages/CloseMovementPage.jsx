import { useState } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { Button } from "../../../shared/components/Button.jsx";
import { Field } from "../../../shared/components/Field.jsx";
import { movimentacoesApi } from "../movimentacoesApi.js";

const today = new Date().toISOString().slice(0, 10);

export function CloseMovementPage() {
  const [form, setForm] = useState({ etiquetaServico: "", dataSaida: today });
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

    if (!form.etiquetaServico.trim() || !form.dataSaida) {
      setError("Informe etiqueta de servico e data de saida.");
      return;
    }

    setSaving(true);
    try {
      const response = await movimentacoesApi.close(form);
      setMessage(response.message);
      setForm({ etiquetaServico: "", dataSaida: today });
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

      <form className="inline-form" onSubmit={handleSubmit}>
        <Field label="Etiqueta de servico">
          <input name="etiquetaServico" value={form.etiquetaServico} onChange={updateField} required />
        </Field>
        <Field label="Data de saida">
          <input type="date" name="dataSaida" value={form.dataSaida} onChange={updateField} required />
        </Field>
        <Button disabled={saving}>{saving ? "Fechando..." : "Fechar"}</Button>
      </form>
    </section>
  );
}
