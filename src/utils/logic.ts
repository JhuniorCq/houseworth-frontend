import { neighborhoodsOptions } from "./selectOptions";

export const searchNeighborhood = (neighborhoodName: string) =>
  neighborhoodsOptions.find((n) => n.value === neighborhoodName)?.label ?? "-";
