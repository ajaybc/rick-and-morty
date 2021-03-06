import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import styles from './Pagination.module.css';

const Pagination = ({
  totalPages,
  currentPage,
}) => {
  const history = useHistory();

  return (
    <div className={styles.container} data-test-id="pagination">
      {(currentPage !== 1) && 
        <Button variant="contained" style={{ marginRight: '10px' }} onClick={() => history.push(`?page=${currentPage - 1}`)} data-test-id="pagination-prev">
          Previous
        </Button>}
      {(currentPage < totalPages) && 
        <Button variant="contained" onClick={() => history.push(`?page=${currentPage + 1}`)} data-test-id="pagination-next">
          Next
        </Button>}
    </div>
  );
}

export default Pagination;
