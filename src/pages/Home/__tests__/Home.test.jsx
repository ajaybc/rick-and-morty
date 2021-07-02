import { render, screen, waitFor } from '@testing-library/react';
import fetch from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';

import Home from '../';

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

const getMockCharacterResult = () => {
  const fakeCharacter = {
    name: 'Morty Smith',
    gender: 'Male',
    species: 'Human',
    status: 'alive',
    location: fakeLocation,
    episode: fakeEpisodes,
  }

  const results = new Array(10).fill(1).map((_, index) => ({
    ...fakeCharacter,
    id: index,
  }));

  return {
    info: {
      count: 100,
      pages: 10
    },
    results,
  }
}

describe('<CharacterList />', () => {
  beforeEach(() => {
    fetch.doMock();
  });

  afterEach(() => {
    fetch.resetMocks();
  })

  test('renders correctly', async () => {
    fetch.mockOnce(JSON.stringify(getMockCharacterResult()));
    fetch.mockResponse((req) => {
      if (req.url === fakeLocation.url) {
        return Promise.resolve(JSON.stringify(fakeLocationResult));
      }
      return Promise.resolve(JSON.stringify(fakeEpisodesResult));
    });
    
    const { asFragment } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/?page=2']}>
          <Home/>
        </MemoryRouter>
      </HelmetProvider>
    );

    expect(screen.getByText('Loading characters ...')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryAllByText(fakeEpisodesResult.name)).toHaveLength(10));
    expect(document.title).toEqual('Rick and Morty characters - Page 2');
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders error when there is character loading error', async () => {
    const fakeFetchError = new Error('Character fetching error');
    fetch.mockReject(fakeFetchError);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/?page=2']}>
          <Home />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(await screen.findByText('Error loading characters. Please refresh the page')).toBeInTheDocument();
    expect(consoleErrorSpy).toBeCalledWith(fakeFetchError);
    consoleErrorSpy.mockReset();
  });
});

