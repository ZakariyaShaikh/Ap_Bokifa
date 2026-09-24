import { createContext, useCallback, useContext, useMemo } from "react";
import toast from "react-hot-toast";
import { usePersistentState } from "../../hooks/usePersistentState";
import { SHOP_STORAGE_KEYS, toSafeArray } from "../../utils/shopStorage";
import { toBookItem } from "../../utils/bookItem";
import { computeCartTotals } from "../../utils/cartTotals";
import { clampQuantity } from "../../utils/quantity";

const CartContext = createContext(null);


export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};


const sanitizeStoredCart = (stored) =>
  toSafeArray(stored)
    .filter((item) => item.id !== null && item.id !== undefined)
    .map((item) => ({ ...item, quantity: clampQuantity(item.quantity) }));

const sameId = (left, right) => String(left) === String(right);

export const CartProvider = ({ children }) => {
  const [items, setItems] = usePersistentState(SHOP_STORAGE_KEYS.cart, [], sanitizeStoredCart);

  const totals = useMemo(() => computeCartTotals(items), [items]);

  const quantities = useMemo(
    () => new Map(items.map((item) => [String(item.id), item.quantity])),
    [items]
  );

  const addItem = useCallback(
    (book, quantity = 1) => {
      const item = toBookItem(book);

      if (!item) return false;

      setItems((previous) => {
        const existing = previous.find((line) => sameId(line.id, item.id));

        if (!existing) {
          return [...previous, { ...item, quantity: clampQuantity(quantity), addedAt: Date.now() }];
        }

        return previous.map((line) =>
          sameId(line.id, item.id)
            ? { ...line, ...item, quantity: clampQuantity(line.quantity + quantity) }
            : line
        );
      });

      toast.success(`${item.title} added to cart`);

      return true;
    },
    [setItems]
  );

  const setQuantity = useCallback(
    (bookId, quantity) => {
      setItems((previous) =>
        previous.map((line) => (sameId(line.id, bookId) ? { ...line, quantity: clampQuantity(quantity) } : line))
      );
    },
    [setItems]
  );

  const removeItem = useCallback(
    (bookId) => {
      setItems((previous) => previous.filter((line) => !sameId(line.id, bookId)));
      toast.success("Removed from cart");
    },
    [setItems]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    toast.success("Cart cleared");
  }, [setItems]);

  const getQuantity = useCallback((bookId) => quantities.get(String(bookId)) || 0, [quantities]);

  const value = {
    items,
    quantities,
    ...totals,
    addItem,
    setQuantity,
    removeItem,
    increment: (bookId) => setQuantity(bookId, getQuantity(bookId) + 1),
    decrement: (bookId) => setQuantity(bookId, getQuantity(bookId) - 1),
    clearCart,
    getQuantity,
    hasItem: (bookId) => getQuantity(bookId) > 0,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
