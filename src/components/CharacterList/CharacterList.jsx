import { Toolbar, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import CharacterCard from '../CharacterCard';

const CharacterList = ({
  characters,
}) => (
  <Grid container spacing={3}>
    {
      characters.map((character) => (
        <Grid item xs={3}>
          <CharacterCard key={character.id} character={character} />
        </Grid>
      ))
    }
  </Grid>
);

export default CharacterList;
