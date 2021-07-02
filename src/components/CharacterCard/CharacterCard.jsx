import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styles from './CharacterCard.module.css';

import Location from '../Location';
import Episodes from '../Episodes';

const CharacterCard = ({
  character
}) => {
  const characterSubtitle = `${character.status} - ${character.species} - ${character.gender}`;
  return (
    <Card data-test-id="character-card">
      <CardActionArea>
        <CardMedia
          component={'img'}
          image={process.env.PUBLIC_URL + '/placehold-thumbnail.svg'}
          title={character.name}
        />
        <CardMedia
          className={styles.avatar}
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
