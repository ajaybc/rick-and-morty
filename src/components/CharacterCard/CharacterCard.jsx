import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Location from '../Location';
import Episodes from '../Episodes';

const CharacterCard = ({
  character
}) => {
  const characterSubtitle = `${character.status} - ${character.species} - ${character.gender}`;
  return (
    <Card className={'s'} data-test-id="character-card">
      <CardActionArea>
        <CardMedia
          className={'s'}
          component={'img'}
          image={character.image}
          title={character.name}
        />
        <CardContent>
          <Typography variant="h5" component="h2" noWrap title={character.name} data-test-id="character-name">
            {character.name}
          </Typography>
          
          <Typography variant="subtitle1" gutterBottom noWrap title={characterSubtitle}>
            {characterSubtitle}
          </Typography>
          <Location location={character.location} />
          <Episodes episodes={character.episode} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CharacterCard;
