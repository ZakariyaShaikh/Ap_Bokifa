export const SHOP_STORAGE_KEYS = {
  cart: "bokifa.cart.v1",
  wishlist: "bokifa.wishlist.v1",
  recentSearches: "bokifa.recent-searches.v1",
};



export const readStoredJson = (key, fallback) => {
  if (typeof window === "undefined" || !window.localStorage) return fallback;

  try {
    const raw = window.localStorage.getItem(key);

    if (raw === null) return fallback;

    const parsed = JSON.parse(raw);

    return parsed === null || parsed === undefined ? fallback : parsed;
  } catch {
    return fallback;
  }
};


export const writeStoredJson = (key, value) => {
  if (typeof window === "undefined" || !window.localStorage) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {

  }
};


export const toSafeArray = (value) => (Array.isArray(value) ? value.filter((entry) => entry && typeof entry === "object") : []);
