import { useCallback, useEffect, useState } from 'react';

const useBounds = (trigger, calculateBounds) => {
  const [bounds, setBounds] = useState(null);

  const getBounds = useCallback(() => {
    if (!calculateBounds || !trigger) return;
    const triggerBounds = trigger.getBoundingClientRect();
    setBounds(triggerBounds);
  }, [calculateBounds, trigger]);

  useEffect(() => {
    getBounds();
  }, [getBounds]);

  useEffect(() => {
    window.addEventListener('resize', getBounds);
    return () => {
      window.removeEventListener('resize', getBounds);
    }
  }, [getBounds]);

  return bounds;
};

export {
  useBounds,
}
