import { useEffect, useState } from 'react';

const useEpisodes = (chapterUrls) => {
  const [isLoading, setIsLoading] = useState(true);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const promises = chapterUrls.map((chapterUrl) => (
      fetch(chapterUrl)
        .then(response => response.json())
    ));

    Promise.allSettled(promises)
      .then((results) => {
        const fulfilledValues = results
          .filter((result) => result.status === 'fulfilled')
          .map((result) => result.value);
        setEpisodes(fulfilledValues);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [chapterUrls])

  return {
    isLoading,
    episodes,
  }
}

export default useEpisodes;
