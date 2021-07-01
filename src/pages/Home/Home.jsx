import usePage from '../../hooks/usePage';
import { Typography } from '@material-ui/core';
import useCharacterApi from '../../hooks/useCharacterApi';
import CharacterList from '../../components/CharacterList';
import Pagination from '../../components/Pagination';

const Home = () => {
  const { currentPage } = usePage();
  const { isLoading, characters, totalPages, hasError } = useCharacterApi(currentPage);
  return (
    <>
      {isLoading && !hasError && <Typography variant="h5">
        Loading characters ...
      </Typography>}
      {(!isLoading && !hasError) && <CharacterList characters={characters} /> }
      {(!isLoading && !hasError) &&  <Pagination totalPages={totalPages} currentPage={currentPage} />}
      {hasError && <Typography variant="h5">
        Error loading characters. Please refresh the page
      </Typography>}
    </>
  );
};

export default Home;