import { render, screen } from '@testing-library/react';
import fetch from 'jest-fetch-mock';

import Location from '../';

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

describe('<Location />', () => {
  beforeEach(() => {
    fetch.doMock();
  });

  afterEach(() => {
    fetch.resetMocks();
  })

  test('loads and displays the location correctly', async () => {
    fetch.mockResponse(JSON.stringify(fakeLocationResult));
    render(<Location location={fakeLocation}/>);
    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Loading dimension ...')).toBeInTheDocument();
    expect(screen.getByText('Loading population ...')).toBeInTheDocument();
    expect(await screen.findByText('Replacement Dimension')).toBeInTheDocument();
    expect(await screen.findByText('5 resident(s)')).toBeInTheDocument();
  });

  test('handles error correctly', async () => {
    const fakeFetchError = new Error('some fetching error');
    fetch.mockReject(fakeFetchError);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(<Location location={fakeLocation} />);
    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(await screen.findByText('Error loading dimension')).toBeInTheDocument();
    expect(consoleErrorSpy).toBeCalledWith(fakeFetchError);
    consoleErrorSpy.mockReset();
  });
});

