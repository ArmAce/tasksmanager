import React, { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
    const initType = initialValue.constructor.name;

    const getItem = (item) => {
        
        if(["Array", "Object"].includes(initType)) {
            return JSON.parse(item);
        }
        return item;
    }

    const setItem = (item) => {
        if(["Array", "Object"].includes(initType)) {
            return JSON.stringify(item);
        }
        return item;
    }

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
    
      return item ? getItem(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, setItem(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteValue = (key) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, deleteValue];
}

export default useLocalStorage;
