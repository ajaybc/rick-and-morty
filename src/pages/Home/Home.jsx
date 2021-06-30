import qs from 'qs';

import usePage from '../../hooks/usePage';
import useCharacterApi from '../../hooks/useCharacterApi';

const Home = () => {
  const { currentPage } = usePage();
  const { loading, characters } = useCharacterApi(currentPage);
  return <div>Home Page</div>
};

export default Home;