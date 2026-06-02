import { CloseMovementPage } from "./pages/CloseMovementPage.jsx";
import { CurrentStatusPage } from "./pages/CurrentStatusPage.jsx";
import { MovementFormPage } from "./pages/MovementFormPage.jsx";
import { MovementListPage } from "./pages/MovementListPage.jsx";

export { movimentacoesApi } from "./movimentacoesApi.js";

export const movimentacoesPageEntries = [
  [
    "registrar",
    {
      navLabel: "Registrar",
      title: "Registrar movimentacao",
      component: MovementFormPage
    }
  ],
  [
    "historico",
    {
      navLabel: "Historico",
      title: "Historico de movimentacoes",
      component: MovementListPage
    }
  ],
  [
    "fechar",
    {
      navLabel: "Fechar",
      title: "Fechar movimentacao",
      component: CloseMovementPage
    }
  ],
  [
    "situacao",
    {
      navLabel: "Em uso",
      title: "Equipamentos em uso",
      component: CurrentStatusPage
    }
  ]
];
