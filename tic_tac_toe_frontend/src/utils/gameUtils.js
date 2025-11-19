const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * PUBLIC_INTERFACE
 * calculateWinner - Determines the winner for a given board state.
 * @param {Array<string|null>} squares - Array of 9 entries 'X' | 'O' | null
 * @returns {{winner: ('X'|'O'|null), line: number[]}} - winner and winning line indices
 */
export function calculateWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}

/**
 * PUBLIC_INTERFACE
 * isDraw - Returns true if the board is full and there is no winner.
 * @param {Array<string|null>} squares
 * @returns {boolean}
 */
export function isDraw(squares) {
  return squares.every((x) => x) && !calculateWinner(squares).winner;
}
