import { useEffect, useRef } from 'react';

const useScrollBlocker = (condition) => {
  const scrollBlocked = useRef(false);

  const block = () => {
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.marginRight = `${scrollWidth}px`;
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
    scrollBlocked.current = true;
  };

  const unblock = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    scrollBlocked.current = false;
  };

  useEffect(() => {
    if (condition && !scrollBlocked.current) {
      block();
    } else if (!condition && scrollBlocked.current) {
      unblock();
    }

    return unblock
  }, [condition]);
};

export {
  useScrollBlocker,
}
