import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "../constants/shop";

const roundToCents = (amount) => Math.round(amount * 100) / 100;



export const computeCartTotals = (items) => {
  const list = Array.isArray(items) ? items : [];

  const itemCount = list.reduce((sum, item) => sum + toQuantity(item), 0);

  const subtotal = roundToCents(list.reduce((sum, item) => sum + toLineTotal(item), 0));

  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = itemCount === 0 || qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;

  return {
    itemCount,
    subtotal,
    shipping,
    total: roundToCents(subtotal + shipping),
    qualifiesForFreeShipping,
    amountToFreeShipping: qualifiesForFreeShipping ? 0 : roundToCents(FREE_SHIPPING_THRESHOLD - subtotal),
  };
};

export const toQuantity = (item) => {
  const quantity = Number(item?.quantity);

  return Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
};

export const toLineTotal = (item) => {
  const price = Number(item?.price);

  return (Number.isFinite(price) ? price : 0) * toQuantity(item);
};
