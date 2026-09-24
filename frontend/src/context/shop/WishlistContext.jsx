import { createContext, useCallback, useContext, useMemo } from "react";
import toast from "react-hot-toast";
import { usePersistentState } from "../../hooks/usePersistentState";
import { SHOP_STORAGE_KEYS, toSafeArray } from "../../utils/shopStorage";
import { toBookItem } from "../../utils/bookItem";

const WishlistContext = createContext(null);


export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }

  return context;
};

const sanitizeStoredWishlist = (stored) =>
  toSafeArray(stored).filter((item) => item.id !== null && item.id !== undefined);

const sameId = (left, right) => String(left) === String(right);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = usePersistentState(SHOP_STORAGE_KEYS.wishlist, [], sanitizeStoredWishlist);

  const savedIds = useMemo(() => new Set(items.map((item) => String(item.id))), [items]);

  const isWishlisted = useCallback((bookId) => savedIds.has(String(bookId)), [savedIds]);

  const addItem = useCallback(
    (book) => {
      const item = toBookItem(book);

      if (!item) return false;
      if (savedIds.has(String(item.id))) return false;

      setItems((previous) => [...previous, { ...item, addedAt: Date.now() }]);

      return true;
    },
    [savedIds, setItems]
  );

  const removeItem = useCallback(
    (bookId) => {
      setItems((previous) => previous.filter((item) => !sameId(item.id, bookId)));
    },
    [setItems]
  );

  const toggleItem = useCallback(
    (book) => {
      const item = toBookItem(book);

      if (!item) return;

      if (savedIds.has(String(item.id))) {
        removeItem(item.id);
        toast.success(`${item.title} removed from wishlist`);
        return;
      }

      addItem(item);
      toast.success(`${item.title} saved to wishlist`);
    },
    [addItem, removeItem, savedIds]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
    toast.success("Wishlist cleared");
  }, [setItems]);

  const value = {
    items,
    count: items.length,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isWishlisted,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
