import { useCallback, useEffect, useRef } from 'react';

export const useClickOutside = (self, trigger, callback, condition) => {
  const callbackRef = useRef(callback);

  const handler = useCallback((e) => {
    if (e.target === self || self.contains(e.target) || e.target === trigger || trigger.contains(e.target)) return;

    callbackRef.current && callbackRef.current();
  }, [self]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (condition) {
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
    } else {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    }

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    }
  }, [handler]);
};
