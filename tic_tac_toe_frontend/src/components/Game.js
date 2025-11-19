import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import Board from './Board';
import { calculateWinner } from '../utils/gameUtils';

/**
 * Game state shape for reducer.
 */
const initialState = {
  // board cells: 'X' | 'O' | null
  squares: Array(9).fill(null),
  xIsNext: true,
  isFinished: false,
  winner: null, // 'X' | 'O' | null
  winningLine: [], // indices of winning squares
};

/**
 * Reducer action types.
 */
const ACTIONS = {
  MOVE: 'MOVE',
  RESET: 'RESET',
};

/**
 * Reducer to manage immutable game state transitions.
 */
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MOVE: {
      const { index } = action.payload;
      if (state.isFinished || state.squares[index]) {
        return state; // ignore invalid moves
      }
      const nextSquares = state.squares.slice();
      nextSquares[index] = state.xIsNext ? 'X' : 'O';

      const result = calculateWinner(nextSquares);
      const isBoardFull = nextSquares.every((c) => c);

      return {
        squares: nextSquares,
        xIsNext: !state.xIsNext,
        isFinished: !!result.winner || isBoardFull,
        winner: result.winner,
        winningLine: result.line,
      };
    }
    case ACTIONS.RESET: {
      return { ...initialState };
    }
    default:
      return state;
  }
}

/**
 * Game - Stateful controller component.
 * - Manages Tic Tac Toe logic, status, reset.
 * - Disables input after win/draw.
 * - Provides keyboard navigation between cells (arrow keys).
 */
// PUBLIC_INTERFACE
function Game() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { squares, xIsNext, isFinished, winner, winningLine } = state;

  const statusText = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (isFinished) return 'Draw';
    return `Current: ${xIsNext ? 'X' : 'O'}`;
  }, [winner, isFinished, xIsNext]);

  const onPlay = useCallback(
    (index) => {
      if (isFinished) return;
      dispatch({ type: ACTIONS.MOVE, payload: { index } });
    },
    [isFinished]
  );

  const onReset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  // Manage keyboard arrow navigation across grid
  const buttonsRef = useRef([]);
  useEffect(() => {
    buttonsRef.current = buttonsRef.current.slice(0, 9);
  }, []);

  const onKeyDown = useCallback((e, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
    let nextIndex = idx;
    if (e.key === 'ArrowRight' && col < 2) nextIndex = idx + 1;
    if (e.key === 'ArrowLeft' && col > 0) nextIndex = idx - 1;
    if (e.key === 'ArrowDown' && row < 2) nextIndex = idx + 3;
    if (e.key === 'ArrowUp' && row > 0) nextIndex = idx - 3;
    if (nextIndex !== idx && buttonsRef.current[nextIndex]) {
      buttonsRef.current[nextIndex].focus();
    }
  }, []);

  const isBoardDisabled = isFinished;

  return (
    <section aria-label="Tic Tac Toe Game" aria-describedby="game-status">
      <div
        id="game-status"
        className="status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="badge">{xIsNext ? 'X' : 'O'}</span>
        <span>{statusText}</span>
      </div>

      <Board
        squares={squares}
        onPlay={onPlay}
        disabled={isBoardDisabled}
        winningLine={winningLine}
        buttonsRef={buttonsRef}
        onKeyDown={onKeyDown}
      />

      <div className="controls">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onReset}
          aria-label="Restart game"
        >
          Restart
        </button>
      </div>
    </section>
  );
}

export default Game;
