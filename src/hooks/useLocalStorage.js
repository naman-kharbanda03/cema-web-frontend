import { useState, useEffect } from "react";

// Custom hook for using local storage
function useLocalStorage(key, initialValue) {
  // Get the initial value from local storage or use the provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
      return initialValue;
    }
  });

  // Update local storage whenever the state changes
  useEffect(() => {
    try {
      const serializedValue = JSON.stringify(storedValue);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error storing data in local storage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
