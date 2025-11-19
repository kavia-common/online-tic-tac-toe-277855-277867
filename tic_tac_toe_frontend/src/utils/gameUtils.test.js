import { calculateWinner, isDraw } from './gameUtils';

describe('calculateWinner', () => {
  test('detects row win', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];
    const res = calculateWinner(squares);
    expect(res.winner).toBe('X');
    expect(res.line).toEqual([0,1,2]);
  });

  test('detects diagonal win', () => {
    const squares = ['O', null, null, null, 'O', null, null, null, 'O'];
    const res = calculateWinner(squares);
    expect(res.winner).toBe('O');
    expect(res.line).toEqual([0,4,8]);
  });

  test('no winner returns null', () => {
    const squares = [null, null, null, null, null, null, null, null, null];
    const res = calculateWinner(squares);
    expect(res.winner).toBeNull();
    expect(res.line).toEqual([]);
  });
});

describe('isDraw', () => {
  test('true when full board with no winner', () => {
    const squares = ['X','O','X','X','O','O','O','X','X'];
    expect(isDraw(squares)).toBe(true);
  });
  test('false when winner exists', () => {
    const squares = ['X','X','X','O','O',null,null,null,null];
    expect(isDraw(squares)).toBe(false);
  });
});
