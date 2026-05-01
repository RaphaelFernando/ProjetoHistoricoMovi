# Controle de Equipamentos

Sistema para cadastro de equipamentos e controle de historico de movimentacoes.

Esta versao recria a aplicacao separando frontend e backend:

- `frontend/`: interface React responsiva.
- `backend/`: API REST em Node.js com Express.
- Persistencia em SQLite.

## Funcionalidades

- Cadastrar equipamentos.
- Listar equipamentos cadastrados.
- Buscar equipamento por etiqueta de servico.
- Registrar movimentacao por etiqueta.
- Listar historico de movimentacoes.
- Fechar movimentacao aberta.
- Consultar situacao atual dos equipamentos em uso.

## Arquitetura

O projeto foi organizado por responsabilidade e dominio, evitando arquivos soltos por tipo tecnico quando isso dificulta a manutencao.

### Backend

```text
backend/src
├── app.js
├── routes.js
├── server.js
├── modules
│   ├── equipamentos
│   │   ├── equipamentos.controller.js
│   │   ├── equipamentos.repository.js
│   │   ├── equipamentos.routes.js
│   │   └── equipamentos.service.js
│   └── movimentacoes
│       ├── movimentacoes.controller.js
│       ├── movimentacoes.repository.js
│       ├── movimentacoes.routes.js
│       └── movimentacoes.service.js
└── shared
    ├── database
    ├── errors
    ├── http
    └── utils
```

- `routes`: define as rotas HTTP.
- `controllers`: recebem requisicoes e formatam respostas.
- `services`: concentram regras de negocio.
- `repositories`: acessam o SQLite.
- `shared`: codigo reutilizavel e infraestrutura comum.

### Frontend

```text
frontend/src
├── app
│   ├── App.jsx
│   ├── Navigation.jsx
│   └── pages.js
├── features
│   ├── equipamentos
│   │   ├── equipamentosApi.js
│   │   └── pages
│   └── movimentacoes
│       ├── movimentacoesApi.js
│       └── pages
└── shared
    ├── components
    ├── hooks
    ├── services
    └── styles
```

- `app`: estrutura principal da aplicacao.
- `features`: telas e chamadas de API por dominio.
- `shared`: componentes, hooks, cliente HTTP e estilos reutilizaveis.

## Requisitos

- Node.js 24 ou superior.
- npm 11 ou superior.

## Backend

Entre na pasta do backend:

```powershell
cd backend
```

Instale as dependencias:

```powershell
npm install
```

Crie o arquivo `.env` com base no exemplo:

```powershell
Copy-Item .env.example .env
```

Variaveis disponiveis:

```env
PORT=3333
DB_PATH=./data/equipamentos.db
FRONTEND_ORIGIN=http://localhost:5173
```

Rode a API:

```powershell
npm run dev
```

A API ficara em:

```text
http://localhost:3333/api
```

## Frontend

Em outro terminal, entre na pasta do frontend:

```powershell
cd frontend
```

Instale as dependencias:

```powershell
npm install
```

Crie o arquivo `.env` com base no exemplo:

```powershell
Copy-Item .env.example .env
```

Variavel necessaria:

```env
VITE_API_URL=http://localhost:3333/api
```

Rode a interface:

```powershell
npm run dev
```

O Vite informara a URL local, normalmente:

```text
http://localhost:5173
```

## Endpoints REST

- `GET /api/health`
- `GET /api/equipamentos`
- `POST /api/equipamentos`
- `GET /api/equipamentos/:etiquetaServico`
- `GET /api/movimentacoes`
- `POST /api/movimentacoes`
- `PATCH /api/movimentacoes/fechar`
- `GET /api/movimentacoes/situacao-atual`

## Banco de Dados

O backend usa SQLite. Por padrao, o arquivo fica em:

```text
backend/data/equipamentos.db
```

As tabelas sao criadas automaticamente ao iniciar a API.
