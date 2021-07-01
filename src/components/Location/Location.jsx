import React from 'react';
import Typography from '@material-ui/core/Typography';
import useLocation from '../../hooks/useLocation';

const Location = ({
  location
}) => {
  const { isLoading, hasError, locationData } = useLocation(location.url);
  return (
    <>
      <Typography variant="button" display="block" gutterBottom>
        Location
      </Typography>
      <Typography variant="subtitle1" gutterBottom noWrap>
        {location.name}
      </Typography>
      {
        isLoading && <>
          <Typography variant="subtitle1" gutterBottom noWrap>
            Loading dimension ...
          </Typography>
          <Typography variant="subtitle1" gutterBottom noWrap>
            Loading population ...
          </Typography>
        </>
      }
      {
        !isLoading && !hasError && <>
          <Typography variant="subtitle1" gutterBottom noWrap>
            {(locationData.dimension) ? locationData.dimension: 'Unknown dimension'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom noWrap>
            {locationData.residents && locationData.residents.length} resident(s)
          </Typography>
        </>
      }
    </>
  );
}

export default Location;
