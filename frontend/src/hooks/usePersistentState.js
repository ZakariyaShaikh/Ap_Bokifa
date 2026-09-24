import { useEffect, useState } from "react";
import { readStoredJson, writeStoredJson } from "../utils/shopStorage";



export const usePersistentState = (storageKey, initialValue, sanitize) => {
  const [value, setValue] = useState(() => {
    const stored = readStoredJson(storageKey, initialValue);

    return typeof sanitize === "function" ? sanitize(stored) : stored;
  });

  useEffect(() => {
    writeStoredJson(storageKey, value);
  }, [storageKey, value]);

  return [value, setValue];
};
