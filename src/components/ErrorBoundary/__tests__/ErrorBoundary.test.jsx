import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorBoundary from '../';

const InnocentDummyComponent = () => <>component content</>;
const RogueDummyComponent = () => {
  throw new Error('Some random error');
}

describe('<ErrorBoundary />', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  test('renders child component correctly when there is no error', () => {
    render(
      <ErrorBoundary>
        <InnocentDummyComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('component content')).toBeInTheDocument();
    expect(screen.queryByText('There was an error loading this page')).not.toBeInTheDocument();
  });

  test('renders error message when there is error', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(
      <ErrorBoundary>
        <RogueDummyComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText('There was an error loading this page')).toBeInTheDocument();
    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockReset();
  });

  test('clicking on reload button calls window.location.reload', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(
      <ErrorBoundary>
        <RogueDummyComponent />
      </ErrorBoundary>
    );
    expect(window.location.reload).not.toHaveBeenCalled();
    userEvent.click(screen.getByTestId('reload-btn'));
    expect(window.location.reload).toHaveBeenCalled();
    consoleErrorSpy.mockReset();
  });
});

