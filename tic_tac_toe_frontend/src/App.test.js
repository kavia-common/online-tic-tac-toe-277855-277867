import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test('allows making a move and updates status', () => {
  render(<App />);
  const cells = screen.getAllByRole('gridcell');
  // First move X
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('X');
  // Status should show next is O or Current: O/Winner
  expect(screen.getByText(/Current: O|Winner|Draw/)).toBeInTheDocument();
});
