# Controle de Equipamentos

Sistema para cadastro de equipamentos e controle do historico de movimentacoes.

Esta versao separa a aplicacao em duas partes:

- `backend/`: API REST em Node.js com Express e persistencia SQLite.
- `frontend/`: interface React com Vite.

## Estrutura

```text
.
|-- backend
|   |-- .env.example
|   |-- package.json
|   `-- src
|       |-- app.js
|       |-- routes.js
|       |-- server.js
|       |-- modules
|       |   |-- equipamentos
|       |   `-- movimentacoes
|       `-- shared
|           |-- config
|           |-- database
|           |-- errors
|           |-- http
|           `-- utils
|-- frontend
|   |-- .env.example
|   |-- package.json
|   |-- vite.config.js
|   `-- src
|       |-- app
|       |-- features
|       `-- shared
|-- package.json
`-- README.md
```

## Requisitos

- Node.js 24 ou superior
- npm 11 ou superior

## Instalacao

Na raiz do repositorio:

```powershell
npm run setup
```

Se preferir instalar separadamente:

```powershell
npm run install:backend
npm run install:frontend
```

## Configuracao

Backend:

```powershell
Copy-Item backend/.env.example backend/.env
```

Frontend:

```powershell
Copy-Item frontend/.env.example frontend/.env
```

Variaveis do backend:

```env
PORT=3333
DB_PATH=./data/equipamentos.db
FRONTEND_ORIGIN=http://localhost:5173
```

Variavel do frontend:

```env
VITE_API_URL=http://localhost:3333/api
```

## Executar

API:

```powershell
npm run dev:backend
```

Interface:

```powershell
npm run dev:frontend
```

O backend fica disponivel em `http://localhost:3333/api`.

O frontend normalmente sobe em `http://localhost:5173`.

## Scripts uteis

- `npm run dev:backend`: inicia a API em modo watch.
- `npm run start:backend`: inicia a API sem watch.
- `npm run dev:frontend`: inicia o Vite.
- `npm run build:frontend`: gera o build do frontend.

## Endpoints

- `GET /api/health`
- `GET /api/equipamentos`
- `POST /api/equipamentos`
- `GET /api/equipamentos/:etiquetaServico`
- `GET /api/movimentacoes`
- `POST /api/movimentacoes`
- `PATCH /api/movimentacoes/fechar`
- `GET /api/movimentacoes/situacao-atual`

## Banco de dados

O backend usa SQLite e cria as tabelas automaticamente ao iniciar.

Por padrao, o banco fica em:

```text
backend/data/equipamentos.db
```

O caminho configurado em `DB_PATH` e resolvido a partir da pasta `backend/`, evitando diferencas quando a API e iniciada da raiz do repositorio.
