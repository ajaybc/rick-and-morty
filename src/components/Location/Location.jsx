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
      <Typography variant="subtitle1" gutterBottom noWrap data-test-id="character-location-name">
        {location.name}
      </Typography>
      {
        isLoading && <>
          <Typography variant="subtitle1" gutterBottom noWrap data-test-id="character-location-dimension">
            Loading dimension ...
          </Typography>
          <Typography variant="subtitle1" gutterBottom noWrap data-test-id="character-location-population">
            Loading population ...
          </Typography>
        </>
      }
      {
        !isLoading && !hasError && <>
          <Typography variant="subtitle1" gutterBottom noWrap data-test-id="character-location-dimension">
            {(locationData.dimension) ? locationData.dimension: 'Unknown dimension'}
          </Typography>
          <Typography variant="subtitle1" gutterBottom noWrap data-test-id="character-location-population">
            {locationData.residents && locationData.residents.length} resident(s)
          </Typography>
        </>
      }

      {
        hasError && <>
          <Typography variant="subtitle1" gutterBottom noWrap data-test-id="character-location-error">
            Error loading location
          </Typography>
        </>
      }
    </>
  );
}

export default Location;
