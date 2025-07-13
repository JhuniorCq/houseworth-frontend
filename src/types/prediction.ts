export type PredictionResult = {
  price: number;
  grLivArea: number;
  garageCars: number;
  totalBsmtSF: number;
  yearBuilt: number;
  overallQual: number;
  neighborhood: string;
  isModern: boolean;
  isLuxury: boolean;
  predictionDate: string;
  predictionTime: string;
};

export type HistoryResult = {
  predictions: PredictionResult[];
  totalAmount: number;
  simpleAmount: number;
  multipleAmount: number;
};

export type HouseData = {
  overallQual: number;
  neighborhood: string;
  grLivArea: number;
  garageCars: number;
  totalBsmtSF: number;
  yearBuilt: number;
};
