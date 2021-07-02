import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '../../Pagination';
import usePage from '../../../hooks/usePage';

const PageSpy = () => {
  const { currentPage } = usePage();
  return <div data-test-id="current-page-spy">{currentPage}</div>
}

describe('<Pagination />', () => {
  test('renders the next page button only in the first page', () => {
    render(
      <Pagination currentPage={1} totalPages={10}/>
    );
    expect(screen.queryByText(/previous/i)).not.toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  test('renders previous and back buttons when not in first or last page', () => {
    render(
      <Pagination currentPage={3} totalPages={10} />
      );
      expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  test('renders previous button only if the user is in the last page', () => {
    render(
      <Pagination currentPage={10} totalPages={10} />
    );

    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.queryByText(/next/i)).not.toBeInTheDocument();
  });
  

  test('clicking on the next page button triggers navigation to next page', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Pagination currentPage={2} totalPages={10} />
        <PageSpy />
      </MemoryRouter>
    );
    expect(screen.getByTestId('current-page-spy')).toHaveTextContent(2);
    const nextPageBtn = screen.getByText(/next/i);
    userEvent.click(nextPageBtn);
    expect(screen.getByTestId('current-page-spy')).toHaveTextContent(3);
  });

  test('clicking on the previous page button triggers navigation to previous page', () => {
    render(
      <MemoryRouter initialEntries={['/?page=2']}>
        <Pagination currentPage={2} totalPages={10} />
        <PageSpy />
      </MemoryRouter>
    );
    expect(screen.getByTestId('current-page-spy')).toHaveTextContent(2);
    const prevPageBtn = screen.getByText(/previous/i);
    userEvent.click(prevPageBtn);
    expect(screen.getByTestId('current-page-spy')).toHaveTextContent(1);
  });
})

