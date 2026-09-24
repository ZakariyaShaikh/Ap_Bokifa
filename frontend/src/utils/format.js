const CURRENCY_SYMBOL = "$";



export const parsePrice = (price) => {
  if (price === null || price === undefined || price === "") return null;

  const amount = Number(price);

  return Number.isFinite(amount) ? amount : null;
};


export const formatPrice = (price) => {
  const amount = parsePrice(price);

  return amount === null ? "—" : `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;
};


export const formatPriceCompact = (price) => {
  const amount = parsePrice(price);

  if (amount === null) return "—";

  return `${CURRENCY_SYMBOL}${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
};


export const formatMoney = (amount) => {
  const value = Number(amount);

  return `${CURRENCY_SYMBOL}${(Number.isFinite(value) ? value : 0).toFixed(2)}`;
};


export const formatItemCount = (count) => `${count} ${count === 1 ? "item" : "items"}`;
