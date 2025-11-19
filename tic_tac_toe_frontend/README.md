# Tic Tac Toe Frontend (React)

Modern, accessible Tic Tac Toe game UI with two-player local play, built with React and a lightweight Ocean Professional theme.

## Features
- 3x3 board with accessible controls (role="grid"/"gridcell", keyboard arrows, focus states)
- Current player indicator, winner/draw status
- Highlight winning line, disable board on finish
- Restart button
- Functional components with hooks, immutable updates
- Responsive layout, subtle shadows, rounded corners, smooth transitions
- Minimal unit tests for game logic

## Run locally
- Install dependencies: `npm install`
- Start dev server: `npm start`
- Run tests: `npm test`
- Build for production: `npm run build`

The app is served at http://localhost:3000.

## Theme
Ocean Professional palette:
- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Theme variables are defined in `src/App.css`. A light/dark toggle is available in the header and stored in localStorage.

## Accessibility
- Buttons use meaningful aria-labels (e.g., "Cell 1 empty", "Cell 2 contains X")
- Grid semantics (role="grid" and role="gridcell")
- Focus-visible outlines
- Keyboard navigation with arrow keys, Enter/Space to activate
- Live status region with aria-live="polite"

## Project Structure
- `src/components/Game.js` - stateful game controller
- `src/components/Board.js` - 3x3 grid
- `src/components/Square.js` - memoized button cell
- `src/utils/gameUtils.js` - pure functions for winner/draw logic
- `src/App.js` / `src/App.css` - app shell and theme

## Security & Notes
- No external services or unsafe patterns used
- No new environment variables required
- All inputs are internal UI interactions only

