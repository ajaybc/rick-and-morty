import Grid from '@material-ui/core/Grid';
import CharacterCard from '../CharacterCard';

const CharacterList = ({
  characters,
}) => (
  <Grid container spacing={3}>
    {
      characters.map((character) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CharacterCard key={character.id} character={character} />
        </Grid>
      ))
    }
  </Grid>
);

export default CharacterList;
