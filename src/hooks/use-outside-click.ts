import React, { MutableRefObject, useEffect } from 'react';

export default function useOutsideClick(
  ref: MutableRefObject<HTMLElement | null>,
  isOpened: boolean,
  setOpened: React.Dispatch<React.SetStateAction<boolean>>) {
  useEffect(() => {
    const outsideSortingClickHandler = ({ target }: MouseEvent) => {
      if (isOpened && !ref.current?.contains(target as Node)) {
        setOpened(false);
      }
    };
    if (isOpened) {
      document.addEventListener('mousedown', outsideSortingClickHandler);
    }
    return () => {
      document.removeEventListener('mousedown', outsideSortingClickHandler);
    };
  }, [ ref, isOpened, setOpened ]);
}
