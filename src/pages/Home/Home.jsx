import { Typography } from '@material-ui/core';
import { Helmet } from "react-helmet";
import usePage from '../../hooks/usePage';
import useCharacterApi from '../../hooks/useCharacterApi';
import CharacterList from '../../components/CharacterList';
import Pagination from '../../components/Pagination';

const Home = () => {
  const { currentPage } = usePage();
  const { isLoading, characters, totalPages, hasError } = useCharacterApi(currentPage);
  return (
    <>
      <Helmet>
        <title>{`Rick and Morty characters - Page ${currentPage}`}</title>
      </Helmet>
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