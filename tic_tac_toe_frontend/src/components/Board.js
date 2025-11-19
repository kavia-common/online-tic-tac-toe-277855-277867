import React, { useMemo } from 'react';
import Square from './Square';

/**
 * Board - 3x3 grid container that renders Square components.
 * Provides ARIA roles for grid and gridcells, and passes winning states.
 */
// PUBLIC_INTERFACE
function Board({ squares, onPlay, disabled, winningLine = [], buttonsRef, onKeyDown }) {
  const winningSet = useMemo(() => new Set(winningLine || []), [winningLine]);

  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe board"
      aria-disabled={disabled ? 'true' : 'false'}
    >
      {squares.map((value, idx) => (
        <Square
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          index={idx}
          value={value}
          onClick={() => onPlay(idx)}
          disabled={disabled || Boolean(value)}
          isWinning={winningSet.has(idx)}
          ariaLabel={`Cell ${idx + 1} ${value ? `contains ${value}` : 'empty'}`}
          buttonRef={(el) => {
            if (buttonsRef && buttonsRef.current) {
              buttonsRef.current[idx] = el;
            }
          }}
          onKeyDown={(e) => onKeyDown && onKeyDown(e, idx)}
        />
      ))}
    </div>
  );
}

export default Board;
