import React from 'react';

import { useState } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { Button } from "../../../shared/components/Button.jsx";
import { Field } from "../../../shared/components/Field.jsx";
import { equipamentosApi } from "../equipamentosApi.js";

export function SearchEquipmentPage() {
  const [etiquetaServico, setEtiquetaServico] = useState("");
  const [equipment, setEquipment] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setEquipment(null);

    if (!etiquetaServico.trim()) {
      setError("Informe a etiqueta de servico.");
      return;
    }

    try {
      setEquipment(await equipamentosApi.findByEtiqueta(etiquetaServico));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="panel">
      <Alert type="error">{error}</Alert>
      <form className="inline-form" onSubmit={handleSubmit}>
        <Field label="Etiqueta de servico">
          <input value={etiquetaServico} onChange={(event) => setEtiquetaServico(event.target.value)} />
        </Field>
        <Button>Buscar</Button>
      </form>

      {equipment && (
        <dl className="details-list">
          <div><dt>Marca</dt><dd>{equipment.marca || "-"}</dd></div>
          <div><dt>Modelo</dt><dd>{equipment.modelo || "-"}</dd></div>
          <div><dt>Especificacoes</dt><dd>{equipment.especificacoes || "-"}</dd></div>
          <div><dt>Memoria fisica</dt><dd>{equipment.memoriaFisica || "-"}</dd></div>
          <div><dt>Etiqueta</dt><dd>{equipment.etiquetaServico}</dd></div>
          <div><dt>Codigo expresso</dt><dd>{equipment.codigoServicoExpresso || "-"}</dd></div>
        </dl>
      )}
    </section>
  );
}
