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

export type HouseData = {
  overallQual: number;
  neighborhood: string;
  grLivArea: number;
  garageCars: number;
  totalBsmtSF: number;
  yearBuilt: number;
};
