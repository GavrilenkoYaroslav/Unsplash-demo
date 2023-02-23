import { useCallback, useEffect, useState } from 'react';
import { isEqual } from '../../utils/isEqual';

const useImagePreload = (src) => {
  const convertSrc = (src) => {
    if (!src) return [];

    if (typeof src !== 'string' && !Array.isArray(src)) {
      console.error('src must be a string or an array');
      return [];
    }

    return typeof src === 'string' ? [src] : src;
  };

  const [sources, setSources] = useState(convertSrc(src));
  const [loaded, setLoaded] = useState([]);

  useEffect(() => {
    if (!src) return;

    let temp = src;
    if (typeof temp === 'string') {
      temp = convertSrc(src);
    }
    if (!isEqual(temp, sources)) setSources(temp);
  }, [src, sources]);

  const getImages = useCallback(async () => {
    for (let source of sources) {
      if (!source) return;

      const image = document.createElement('img');
      image.src = source;
      image.onload = () => {
        setLoaded(prev => [...prev, source]);
      };
    }
  }, [sources]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  return loaded;
};

export {
  useImagePreload,
}
