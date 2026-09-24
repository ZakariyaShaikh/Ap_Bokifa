import { MAX_QUANTITY_PER_ITEM } from "../constants/shop";


export const clampQuantity = (quantity) => {
  const numeric = Math.trunc(Number(quantity));

  if (!Number.isFinite(numeric)) return 1;

  return Math.min(Math.max(numeric, 1), MAX_QUANTITY_PER_ITEM);
};
