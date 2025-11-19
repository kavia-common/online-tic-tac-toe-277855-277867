import React, { memo } from 'react';

/**
 * Square - Button cell for the board.
 * Memoized for performance. Uses aria-labels and role gridcell.
 */
function SquareComponent({
  index,
  value,
  onClick,
  disabled,
  isWinning,
  ariaLabel,
  buttonRef,
  onKeyDown,
}) {
  const label = ariaLabel || `Grid cell ${index + 1}`;

  return (
    <button
      type="button"
      className={`square${isWinning ? ' winning' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      role="gridcell"
      aria-selected={value ? 'true' : 'false'}
      ref={buttonRef}
      onKeyDown={onKeyDown}
    >
      {value || ''}
    </button>
  );
}

const Square = memo(SquareComponent);
export default Square;
