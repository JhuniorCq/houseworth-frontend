import { FaHotel, FaHouse } from "react-icons/fa6";
import { GrHistory } from "react-icons/gr";

export const LIST_OF_FEATURES = [
  {
    id: 1,
    icon: FaHouse,
    name: "Predicción Simple",
    description:
      "Predice el precio de una vivienda individual ingresando sus características específicas",
    characteristics: [
      "Análisis individual",
      "Resultados detallados",
      "Factores explicativos",
    ],
    buttonName: "Comenzar Predicción",
    redirectTo: "/prediction",
  },
  {
    id: 2,
    icon: FaHotel,
    name: "Predicción Múltiple",
    description:
      "Analiza múltiples propiedades simultáneamente para comparar y evaluar diferentes opciones",
    characteristics: [
      "Análisis en lote",
      "Comparación directa",
      "Exporar resultados",
    ],
    buttonName: "Análisis Múltiple",
    redirectTo: "/multiple-prediction",
  },
  {
    id: 3,
    icon: GrHistory,
    name: "Historial de Predicciones",
    description:
      "Reisa todas tus predicciones anteriores y mantén un registro de tu análisis",
    characteristics: [
      "Historial completo",
      "Filtros avanzados",
      "Descargar reportes",
    ],
    buttonName: "Ver Historial",
    redirectTo: "/prediction-history",
  },
];

export const NAVBAR_OPTIONS = [
  {
    path: "/home",
    name: "Inicio",
  },
  {
    path: "/prediction",
    name: "Predicción Simple",
  },
  {
    path: "/multiple-prediction",
    name: "Predicción Múltiple",
  },
  {
    path: "/prediction-history",
    name: "Historial",
  },
];
