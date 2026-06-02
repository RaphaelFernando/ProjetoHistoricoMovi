import { env } from "../config/env.js";

export async function request(path, options = {}) {
  const response = await fetch(`${env.apiUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Nao foi possivel concluir a operacao.");
  }

  return data;
}
