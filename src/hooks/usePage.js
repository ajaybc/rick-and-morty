import qs from 'qs';
import {
  useLocation
} from 'react-router-dom';

const usePage = () => {
  const { search } = useLocation();
  let currentPage = 1;
  if (search.length > 0) {
    currentPage = qs.parse(search.slice(1)).page;
  }
  return { currentPage };
}

export default usePage;
