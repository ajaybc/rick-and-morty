import { useEffect, useState } from 'react';

const useLocation = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState({});
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!url) {
      setHasError(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setHasError(false);
    fetch(url)
      .then(response => response.json())
      .then((result) => {
        setLocationData(result);
      })
      .catch((e) => {
        console.error(e);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url])

  return {
    isLoading,
    locationData,
    hasError,
  }
}

export default useLocation;
