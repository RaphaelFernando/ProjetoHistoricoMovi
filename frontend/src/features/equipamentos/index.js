import { EquipmentFormPage } from "./pages/EquipmentFormPage.jsx";
import { EquipmentListPage } from "./pages/EquipmentListPage.jsx";
import { SearchEquipmentPage } from "./pages/SearchEquipmentPage.jsx";

export { equipamentosApi } from "./equipamentosApi.js";

export const equipamentosPageEntries = [
  [
    "cadastro",
    {
      navLabel: "Cadastrar",
      title: "Cadastrar equipamento",
      component: EquipmentFormPage
    }
  ],
  [
    "equipamentos",
    {
      navLabel: "Equipamentos",
      title: "Equipamentos cadastrados",
      component: EquipmentListPage
    }
  ],
  [
    "buscar",
    {
      navLabel: "Buscar",
      title: "Buscar equipamento",
      component: SearchEquipmentPage
    }
  ]
];
