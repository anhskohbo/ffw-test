import { useEffect, useState } from 'react';

const storage = window.localStorage;

// eslint-disable-next-line import/prefer-default-export
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(storage.getItem(key)) || initialValue;
    } catch (e) {
      console.log(e);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  return [value, setValue];
}
