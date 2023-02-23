import { useEffect, useRef } from 'react';

const useScrollBottomTrigger = (callback, offset, skip) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (skip) return;

    const listener = () => {
      const triggered = document.body.clientHeight - window.pageYOffset - window.innerHeight <= (offset || 0);
      if (triggered && callbackRef.current) callbackRef.current();
    };

    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    }
  }, [offset, skip]);
};

export {
  useScrollBottomTrigger,
}
