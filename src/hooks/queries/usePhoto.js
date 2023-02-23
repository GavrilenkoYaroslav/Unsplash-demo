import { useEffect, useState } from 'react';
import ServiceApi from '../../api/service';

const usePhoto = (id, skip) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id === undefined || skip) {
      setData(null);
      setError('');
      return;
    }

    let mounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;

    const query = async () => {
      setIsLoading(true);
      setData(null);
      const response = await ServiceApi.getPhotoById(id, { signal });
      if (!mounted) return;

      setIsLoading(false);
      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
    };

    query();

    return () => {
      mounted = false;
      abortController.abort();
    }
  }, [id, skip]);

  return { data, isLoading, error }
};

export {
  usePhoto
}
