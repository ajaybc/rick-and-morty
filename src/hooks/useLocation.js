import { useEffect, useState } from 'react';
import useIsMounted from './useIsMounted';

const useLocation = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locationData, setLocationData] = useState({});
  const [hasError, setHasError] = useState(false);
  const isMounted = useIsMounted();

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
        if (isMounted.current === false) {
          return;
        }
        setLocationData(result);
      })
      .catch((e) => {
        console.error(e);
        if (isMounted.current === false) {
          return;
        }
        setHasError(true);
      })
      .finally(() => {
        if (isMounted.current === false) {
          return;
        }
        setIsLoading(false);
      });
  }, [url, isMounted])

  return {
    isLoading,
    locationData,
    hasError,
  }
}

export default useLocation;
