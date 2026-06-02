import { useState } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { Button } from "../../../shared/components/Button.jsx";
import { Field } from "../../../shared/components/Field.jsx";
import { equipamentosApi } from "../equipamentosApi.js";

const initialForm = {
  marca: "",
  modelo: "",
  especificacoes: "",
  memoriaFisica: "",
  etiquetaServico: "",
  codigoServicoExpresso: ""
};

export function EquipmentFormPage() {
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

    if (!form.etiquetaServico.trim()) {
      setError("Informe a etiqueta de servico.");
      return;
    }

    setSaving(true);
    try {
      const response = await equipamentosApi.create(form);
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
        <div className="form-actions">
          <Button disabled={saving}>{saving ? "Salvando..." : "Cadastrar"}</Button>
        </div>
      </form>
    </section>
  );
}
