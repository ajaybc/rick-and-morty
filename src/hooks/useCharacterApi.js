import { useEffect, useState } from 'react';
import { API_URL } from '../constants';

const useCharacterApi = (page) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    fetch(`${API_URL}?page=${page}`)
      .then(response => response.json())
      .then(({ info, results }) => {
        setCharacters(results);
        setTotalPages(info.pages);
      })
      .catch((e) => {
        console.error(e);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page])

  return {
    isLoading,
    characters,
    totalPages,
    hasError,
  }
}

export default useCharacterApi;
