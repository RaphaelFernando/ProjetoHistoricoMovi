import { SearchEquipmentPage } from "../features/equipamentos/pages/SearchEquipmentPage.jsx";
import { EquipmentFormPage } from "../features/equipamentos/pages/EquipmentFormPage.jsx";
import { EquipmentListPage } from "../features/equipamentos/pages/EquipmentListPage.jsx";
import { CloseMovementPage } from "../features/movimentacoes/pages/CloseMovementPage.jsx";
import { CurrentStatusPage } from "../features/movimentacoes/pages/CurrentStatusPage.jsx";
import { MovementFormPage } from "../features/movimentacoes/pages/MovementFormPage.jsx";
import { MovementListPage } from "../features/movimentacoes/pages/MovementListPage.jsx";

export const pages = {
  cadastro: {
    navLabel: "Cadastrar",
    title: "Cadastrar equipamento",
    component: EquipmentFormPage
  },
  equipamentos: {
    navLabel: "Equipamentos",
    title: "Equipamentos cadastrados",
    component: EquipmentListPage
  },
  buscar: {
    navLabel: "Buscar",
    title: "Buscar equipamento",
    component: SearchEquipmentPage
  },
  registrar: {
    navLabel: "Registrar",
    title: "Registrar movimentacao",
    component: MovementFormPage
  },
  historico: {
    navLabel: "Historico",
    title: "Historico de movimentacoes",
    component: MovementListPage
  },
  fechar: {
    navLabel: "Fechar",
    title: "Fechar movimentacao",
    component: CloseMovementPage
  },
  situacao: {
    navLabel: "Em uso",
    title: "Equipamentos em uso",
    component: CurrentStatusPage
  }
};

export const pageEntries = Object.entries(pages);
