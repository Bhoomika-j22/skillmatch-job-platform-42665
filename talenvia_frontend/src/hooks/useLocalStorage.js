import { useEffect, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * React hook to keep a value in sync with localStorage.
 * @param {string} key localStorage key
 * @param {any} initialValue fallback initial value
 * @returns {[any, Function]} tuple of [value, setValue]
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota/serialization errors
    }
  }, [key, value]);

  return [value, setValue];
}
