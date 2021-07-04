import { useEffect, useState } from 'react';
import useIsMounted from './useIsMounted';

const useEpisodes = (chapterUrls) => {
  const [isLoading, setIsLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);
  const isMounted = useIsMounted();

  useEffect(() => {
    setIsLoading(true);

    const promises = chapterUrls.map((chapterUrl) => (
      fetch(chapterUrl)
        .then(response => response.json())
    ));

    Promise.allSettled(promises)
      .then((results) => {
        if (isMounted.current === false) {
          return;
        }
        const fulfilledValues = results
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);
        setEpisodes(fulfilledValues);
      })
      .finally(() => {
        if (isMounted.current === false) {
          return;
        }
        setIsLoading(false);
      });
  }, [chapterUrls])

  return {
    isLoading,
    episodes,
  }
}

export default useEpisodes;
