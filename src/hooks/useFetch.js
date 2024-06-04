import {useState, useEffect} from 'react';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [url, JSON.stringify(options)]);

  return {data, error, loading};
}
