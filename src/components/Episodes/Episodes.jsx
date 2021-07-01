import React from 'react';
import Typography from '@material-ui/core/Typography';
import useEpisodes from '../../hooks/useEpisodes';

const Episodes = ({
  episodes
}) => {
  const { isLoading, episodes: episodeDetailsArr } = useEpisodes(episodes);
  const episodeNameString = episodeDetailsArr.map((episodeDetails) => episodeDetails.name).join(', ');
  return (
    <>
      <Typography variant="button" display="block" gutterBottom>
        Episode(s)
      </Typography>
      {
        isLoading && <>
          <Typography variant="subtitle1" gutterBottom noWrap>
            Loading episodes ...
          </Typography>
        </>
      }
      {
        !isLoading && <>
          <Typography variant="subtitle1" gutterBottom noWrap title={episodeNameString}>
            {episodeNameString}
          </Typography>
        </>
      }
    </>
  );
}

export default Episodes;
