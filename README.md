# Memory Game

A classic memory card game built with vanilla HTML, CSS and JavaScript — no libraries or frameworks.

## Features

- 16 cards (8 pairs), shuffled with the Fisher–Yates algorithm on every load and new game
- Move and found-pair counters
- Mismatched pairs close automatically after 1 second
- Win modal with the final number of moves
- Leaderboard with the top 10 results (place, moves, date), saved in `localStorage`
- "New Game" restarts instantly without a page reload
- The whole interface is generated with `document.createElement`; `index.html` contains only a `<script>` in `<body>`

## How to play

1. Click a card to open it, then click a second one.
2. If the images match, the pair stays open.
3. If they don't, both cards close after a second.
4. Find all 8 pairs in as few moves as possible.

## Run locally

1. Clone the repository and switch to the `memory-game` branch:
```bash
   git clone <repo-url>
   cd <repo-folder>
   git checkout memory-game
```
2. Open `index.html` in a browser, or run it with a local server (for example, the Live Server extension in VS Code).

## Tech stack

HTML, CSS, JavaScript (ES6+), `localStorage`, `<dialog>`