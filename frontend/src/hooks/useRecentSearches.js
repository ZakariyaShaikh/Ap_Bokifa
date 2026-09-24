import { useCallback } from "react";
import { usePersistentState } from "./usePersistentState";
import { SHOP_STORAGE_KEYS } from "../utils/shopStorage";
import { RECENT_SEARCH_LIMIT } from "../constants/shop";
import { normalizeTerm } from "../utils/bookSearch";


const sanitizeRecentSearches = (stored) =>
  Array.isArray(stored)
    ? stored.filter((entry) => typeof entry === "string" && entry.trim().length > 0).slice(0, RECENT_SEARCH_LIMIT)
    : [];

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = usePersistentState(
    SHOP_STORAGE_KEYS.recentSearches,
    [],
    sanitizeRecentSearches
  );

  
  const pushSearch = useCallback(
    (term) => {
      const trimmed = (term || "").trim();

      if (!trimmed) return;

      setRecentSearches((previous) => {
        const withoutDuplicate = previous.filter((entry) => normalizeTerm(entry) !== normalizeTerm(trimmed));

        return [trimmed, ...withoutDuplicate].slice(0, RECENT_SEARCH_LIMIT);
      });
    },
    [setRecentSearches]
  );

  const clearRecentSearches = useCallback(() => setRecentSearches([]), [setRecentSearches]);

  return { recentSearches, pushSearch, clearRecentSearches };
};
