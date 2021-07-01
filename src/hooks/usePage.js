import qs from 'qs';
import {
  useLocation
} from 'react-router-dom';

const usePage = () => {
  const { search } = useLocation();
  let currentPage = 1;
  if (search.length > 0) {
    currentPage = parseInt(qs.parse(search.slice(1)).page, 10);
  }
  return { currentPage };
}

export default usePage;
