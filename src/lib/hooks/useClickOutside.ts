import { RefObject, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement | undefined>(
  ref: RefObject<T>,
  callback: (...args: any[]) => void
): void {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}
