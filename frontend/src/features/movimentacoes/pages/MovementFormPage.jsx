import { useRef, useState } from "react";

import { Alert } from "../../../shared/components/Alert.jsx";
import { Button } from "../../../shared/components/Button.jsx";
import { Field } from "../../../shared/components/Field.jsx";
import { movimentacoesApi } from "../movimentacoesApi.js";

const today = new Date().toISOString().slice(0, 10);
const lojasOptions = [
  "Loja 013",
  "Loja 021",
  "Loja 022",
  "Loja 026",
  "Loja 028",
  "Loja 037",
  "Loja 042",
  "Escrit\u00F3rio"
];
const allowedAttachmentExtensions = new Set(["pdf", "doc", "docx"]);
const allowedAttachmentMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
]);
const maxAttachmentSize = 10 * 1024 * 1024;

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
  const [anexo, setAnexo] = useState(null);
  const [fileError, setFileError] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function clearSelectedFile() {
    setAnexo(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleRemoveFile() {
    setFileError("");
    clearSelectedFile();
  }

  function handleReplaceFile() {
    fileInputRef.current?.click();
  }

  function formatFileSize(size) {
    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];
    setFileError("");

    if (!selectedFile) {
      setAnexo(null);
      return;
    }

    const fileExtension = selectedFile.name.includes(".")
      ? selectedFile.name.split(".").pop().toLowerCase()
      : "";
    const hasValidExtension = allowedAttachmentExtensions.has(fileExtension);
    const hasValidMimeType = !selectedFile.type || allowedAttachmentMimeTypes.has(selectedFile.type);

    if (!hasValidExtension || !hasValidMimeType) {
      setFileError("Anexo invalido. Envie apenas PDF, DOC ou DOCX.");
      clearSelectedFile();
      return;
    }

    if (selectedFile.size > maxAttachmentSize) {
      setFileError("O anexo deve ter no maximo 10 MB.");
      clearSelectedFile();
      return;
    }

    setAnexo(selectedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (fileError) {
      return;
    }

    if (!form.etiquetaServico.trim() || !form.dataEntrada) {
      setError("Informe etiqueta de servico e data de entrada.");
      return;
    }

    setSaving(true);
    try {
      const response = await movimentacoesApi.create(form, anexo);
      setMessage(response.message);
      setForm(initialForm);
      clearSelectedFile();
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
          <>
            <input
              id="loja"
              name="loja"
              list="lojas-options"
              value={form.loja}
              onChange={updateField}
            />
            <datalist id="lojas-options">
              {lojasOptions.map((loja) => (
                <option key={loja} value={loja} />
              ))}
            </datalist>
          </>
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
        <div className="form-row-observacoes-anexo">
          <div className="form-field">
            <label className="form-field-label" htmlFor="observacoes">Observacoes</label>
            <textarea
              className="observacoes-textarea"
              id="observacoes"
              name="observacoes"
              value={form.observacoes}
              onChange={updateField}
              rows="4"
            />
          </div>
          <div className="form-field file-upload-field">
            <label className="form-field-label" htmlFor="anexo">Anexo</label>
            <input
              id="anexo"
              ref={fileInputRef}
              type="file"
              name="anexo"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="file-upload-input"
            />
            <label className="file-upload-card" htmlFor="anexo">
              <span className="file-upload-title">Clique para anexar um documento</span>
              <span className="file-upload-description">
                Formatos aceitos: PDF, DOC ou DOCX at&eacute; 10 MB
              </span>
              <span className="file-upload-button">
                {anexo ? "Trocar arquivo" : "Selecionar arquivo"}
              </span>
            </label>
            {anexo ? (
              <div className="file-selected">
                <div>
                  <span className="file-selected-label">Documento selecionado</span>
                  <strong className="file-selected-name">{anexo.name}</strong>
                  <span className="file-selected-meta">Tamanho: {formatFileSize(anexo.size)}</span>
                </div>
                <div className="file-selected-actions">
                  <button type="button" className="file-action-button" onClick={handleReplaceFile}>
                    Trocar arquivo
                  </button>
                  <button type="button" className="file-remove-button" onClick={handleRemoveFile}>
                    Remover arquivo
                  </button>
                </div>
              </div>
            ) : (
              <p className="file-upload-status">Nenhum documento selecionado.</p>
            )}
            {fileError && <small>{fileError}</small>}
          </div>
        </div>
        <div className="form-actions">
          <Button disabled={saving}>{saving ? "Registrando..." : "Registrar"}</Button>
        </div>
      </form>
    </section>
  );
}
