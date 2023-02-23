import { useEffect, useMemo, useRef, useState } from 'react';
import { normalize } from '../../utils/normalize';
import ServiceApi from '../../api/service';

const usePhotos = (page, count) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const entities = useRef(new Map());
  const [data, setData] = useState({
    items: [],
    total: 0,
  });

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;

    const query = async () => {
      setIsLoading(true);
      const response = await ServiceApi.getPhotos(page, count, { signal });
      if (!mounted) return;

      setIsLoading(false);

      if (response.error) {
        setError(response.error);
      } else {
        normalize(response.data, 'id', entities.current);
        setData({
          items: Array.from(entities.current.values()),
          total: response.headers.get('x-total'),
        });
      }
    };

    query();

    return () => {
      mounted = false;
      abortController.abort();
    }
  }, [page, count]);

  return { data: useMemo(() => ({ ...data, entities: entities.current }), [data]), isLoading, error }
};

export {
  usePhotos
}
