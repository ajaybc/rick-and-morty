import { render, screen } from '@testing-library/react';
import Topbar from './Topbar';

test('renders the title correctly', () => {
  render(<Topbar />);
  const titleElement = screen.getByText(/Rick and Morty/i);
  expect(titleElement).toBeInTheDocument();
});

