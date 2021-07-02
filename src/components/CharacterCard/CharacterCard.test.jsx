import { render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';

import CharacterCard from './';

const fakeLocation = {
  name: 'Earth',
  url: 'http://www.example.com/location',
}
const fakeLocationResult = {
  id: 3,
  name: 'Earth',
  dimension: 'Replacement Dimension',
  residents: new Array(5).fill('http://www.example.com/character/id'),
}

const fakeEpisodes = ['http://www.example.com/episode/1'];
const fakeEpisodesResult = {
  id: 1,
  name: 'Fake episode 1',
}

describe('<CharacterCard />', () => {
  beforeEach(() => {
    fetch.doMock();
  });

  afterEach(() => {
    fetch.resetMocks();
  })

  test('renders correctly', async () => {
    const fakeCharacter = {
      id: 2,
      name: 'Morty Smith',
      gender: 'Male',
      species: 'Human',
      status: 'alive',
      location: fakeLocation,
      episode: fakeEpisodes,
    }
    
    fetch.mockResponse((req) => {
      if (req.url === fakeLocation.url) {
        return Promise.resolve(JSON.stringify(fakeLocationResult));
      }
      return Promise.resolve(JSON.stringify(fakeEpisodesResult));
    });

    render(<CharacterCard character={fakeCharacter} />);
    expect(screen.getByText('Loading dimension ...')).toBeInTheDocument();
    expect(screen.getByText('Loading episodes ...')).toBeInTheDocument();
    expect(await screen.findByText('Replacement Dimension')).toBeInTheDocument();
    expect(await screen.findByText('Fake episode 1')).toBeInTheDocument();
  });
});

