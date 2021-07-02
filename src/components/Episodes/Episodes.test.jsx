import { render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';

import Episodes from './Episodes';

describe('<Episode />', () => {
  beforeEach(() => {
    fetch.doMock();
  });

  afterEach(() => {
    fetch.resetMocks();
  })

  test('loads and displays single episode', async () => {
    const fakeEpisodes = ['http://www.example.com/episode/1'];
    const fakeEpisodesResult = {
      id: 1,
      name: 'Fake episode 1',
    }
    fetch.mockResponse(JSON.stringify(fakeEpisodesResult));
    render(<Episodes episodes={fakeEpisodes} />);
    expect(screen.getByText('Loading episodes ...')).toBeInTheDocument();
    expect(await screen.findByText('Fake episode 1')).toBeInTheDocument();
  });

  test('loads and displays multiple episodes correctly', async () => {
    const fakeEpisodes = ['http://www.example.com/episode/1', 'http://www.example.com/episode/2'];
    const fakeEpisodesResults = [
      {
        id: 1,
        name: 'Fake episode 1',
      },
      {
        id: 2,
        name: 'Fake episode 2',
      }
    ];

    fetch.mockResponse((req) => {
      const index = fakeEpisodes.indexOf(req.url);
      return Promise.resolve(JSON.stringify(fakeEpisodesResults[index]));
    });
    render(<Episodes episodes={fakeEpisodes} />);
    expect(screen.getByText('Loading episodes ...')).toBeInTheDocument();
    expect(await screen.findByText('Fake episode 1, Fake episode 2')).toBeInTheDocument();
  });

  test('loads and displays non-errored episodes correctly', async () => {
    const fakeEpisodes = ['http://www.example.com/episode/1', 'http://www.example.com/episode/2'];
    const fakeEpisodesResult = {
      id: 1,
      name: 'Fake episode 1',
    }

    let counter = 1;
    fetch.mockResponse(() => {
      if (counter === 1) {
        counter++;
        return Promise.resolve(JSON.stringify(fakeEpisodesResult));
      } else {
        return Promise.reject();
      }
    });
    render(<Episodes episodes={fakeEpisodes} />);
    expect(screen.getByText('Loading episodes ...')).toBeInTheDocument();
    expect(await screen.findByText('Fake episode 1')).toBeInTheDocument();
  });

  test('displays error message when none of the episodes could be loaded', async () => {
    const fakeEpisodes = ['http://www.example.com/episode/1', 'http://www.example.com/episode/2'];
    fetch.mockResponse(() => Promise.reject());
    render(<Episodes episodes={fakeEpisodes} />);
    expect(screen.getByText('Loading episodes ...')).toBeInTheDocument();
    expect(await screen.findByText('Error fetching episodes')).toBeInTheDocument();
  });
});

