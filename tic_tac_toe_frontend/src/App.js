import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Game from './components/Game';

/**
 * App - Layout shell and theme provider applying the Ocean Professional theme.
 * Provides light/dark toggle for user preference and renders the Tic Tac Toe game.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = window.localStorage.getItem('theme');
      return stored || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const themeLabel = useMemo(
    () => `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
    [theme]
  );

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={themeLabel}
          title={themeLabel}
          type="button"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <main className="container">
          <h1 className="title">Tic Tac Toe</h1>
          <p className="subtitle">Two-player local play</p>
          <Game />
          <footer className="footer-note" aria-live="polite">
            Built with a modern Ocean Professional theme.
          </footer>
        </main>
      </header>
    </div>
  );
}

export default App;
