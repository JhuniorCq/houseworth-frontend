import type { PredictionResult } from "../types/prediction";
import { neighborhoodsOptions, overallQualOptions } from "./selectOptions";

export const searchOverallQual = (overallQual: number) =>
  overallQualOptions.find((o) => o.value === overallQual)?.label ?? "-";

export const searchNeighborhood = (neighborhoodName: string) =>
  neighborhoodsOptions.find((n) => n.value === neighborhoodName)?.label ?? "-";

export const averagePrice = (list: PredictionResult[]) =>
  (list.reduce((acc, item) => acc + item.price, 0) / list.length).toFixed(2);
