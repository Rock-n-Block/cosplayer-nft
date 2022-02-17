import { useCallback, useEffect, useRef, useState } from 'react';

const useClickOutside = (initialState: boolean) => {
  const [isVisible, setVisible] = useState(initialState);
  const ref = useRef<any>(null);

  const handleClickOutside = useCallback((e: Event) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref, isVisible, setVisible };
};

export default useClickOutside;
