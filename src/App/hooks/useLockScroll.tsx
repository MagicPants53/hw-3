import { useEffect, useCallback } from 'react';

export function useLockScroll(
  isOpen: boolean,
  ref: React.RefObject<HTMLElement | null>,
  onClose: () => void
) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && ref.current === event.target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflowY = '';
    };
  }, [isOpen, handleClickOutside]);

  return ref;
}
