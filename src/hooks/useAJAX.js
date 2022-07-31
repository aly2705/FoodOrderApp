import { useCallback, useState } from 'react';

const useAJAX = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sendRequest = useCallback(async (configObj, applyData = () => {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(configObj.url, {
        method: configObj.method || 'GET',
        headers: configObj.headers || {},
        body: configObj.body || null,
      });
      if (!response.ok) {
        throw new Error('Request failed!');
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useAJAX;
