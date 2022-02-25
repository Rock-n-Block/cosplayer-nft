import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';

const useClickOutside = (visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>) => {
  const ref = useRef<any>(null);

  const handleClickOutside = useCallback(
    (e: Event) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setVisible(false);
      }
    },
    [setVisible],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref };
};

export default useClickOutside;
