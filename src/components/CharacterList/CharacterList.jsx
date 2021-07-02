import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CharacterCard from '../CharacterCard';

const CharacterList = ({
  characters,
}) => (
  <Grid container spacing={3}>
    {
      characters.map((character) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
          <CharacterCard character={character} />
        </Grid>
      ))
    }
    {
      characters.length === 0 && 
        <Grid item xs={12}>
          <Typography variant="h5">
            No characters found
          </Typography>
        </Grid>
    }
  </Grid>
);

export default CharacterList;
