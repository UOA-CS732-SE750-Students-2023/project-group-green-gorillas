import { useCallback, useEffect, useState } from "react";

export const useLocalStorage = (storageKey: string) => {
  const [storageValue, setStorageValue] = useState<string | null>(
    localStorage.getItem(storageKey)
  );

  useEffect(() => {
    localStorage.setItem(storageKey, storageValue ?? "");
  }, [storageValue, storageKey]);

  return {
    setStorageValue,
    storageValue,
  };
};
