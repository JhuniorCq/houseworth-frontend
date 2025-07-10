export type PredictionResult = {
  price: number;
  grLivArea: number;
  garageCars: number;
  totalBsmtSF: number;
  yearBuilt: number;
  overallQual: number;
  neighborhood: string;
  grLivAreaQual: number;
  isModern: boolean; // Esto el back lo devuelve como 0 o 1 -> hacer que traiga un booleano
  isLuxury: boolean; // Esto el back lo devuelve como 0 o 1 -> hacer que traiga un booleano
  avgPriceByNbhd: number;
  socioEconomicLevel: any; // Esto hacer que el back devuelva un string
  createdAt: string;
};
