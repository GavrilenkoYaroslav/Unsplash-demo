import { useEffect, useRef, useState } from 'react';
import { getBreakpointValue, getCurrentBreakpoint } from '../../utils/getBreakpoint';

const useBreakpoint = (callback) => {
  const callbackRef = useRef(callback);
  const [breakpoint, setBreakpoint] = useState({
    key: getCurrentBreakpoint(),
    value: getBreakpointValue(getCurrentBreakpoint()),
  });

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = () => {
      const currentBreakpoint = {
        key: getCurrentBreakpoint(),
        value: getBreakpointValue(breakpoint),
      };

      setBreakpoint(currentBreakpoint);
      callbackRef.current && callbackRef.current(currentBreakpoint);
    };

    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    }
  }, []);

  return breakpoint;
};

export {
  useBreakpoint,
}
