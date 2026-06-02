# Tic Tac Toe Game

A modern, responsive Tic Tac Toe game built with HTML, CSS, and JavaScript. Features a beautiful UI with dark/light theme toggle, score tracking, and keyboard shortcuts.

## Features

- 🎮 **Classic Tic Tac Toe gameplay** - Play against a friend (hotseat)
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 🌓 **Dark/Light theme** - Toggle between themes with persistent preference
- 📊 **Score tracking** - Keeps track of wins for X, O, and draws
- ⌨️ **Keyboard shortcuts** - Quick controls for power users
- 📱 **Fully responsive** - Works on desktop, tablet, and mobile
- 💾 **Local storage** - Saves scores and theme preference between sessions
- 🎯 **Visual feedback** - Winning combinations are highlighted with animation

## How to Play

1. **Objective**: Get 3 of your marks (X or O) in a row horizontally, vertically, or diagonally
2. **Turns**: Players alternate placing their marks on the 3x3 grid
3. **Starting player**: Player X always goes first
4. **Game end**: The game ends when:
   - A player gets 3 in a row (that player wins)
   - All 9 squares are filled without a winner (draw)

## Controls

### Mouse/Touch
- Click any empty cell to place your mark
- Use buttons at the bottom for game controls

### Keyboard Shortcuts
- **R** - Reset current game (keep scores)
- **N** - New game (reset all scores)
- **T** - Toggle dark/light theme
- **1-9** - Make move on corresponding cell (1 = top-left, 9 = bottom-right)

## Game Features

### Score Tracking
- Tracks wins for Player X and Player O
- Tracks number of draws
- Scores persist between browser sessions

### Theme System
- Light theme (default): Purple gradient background
- Dark theme: Dark blue gradient background
- Theme preference saved to localStorage

### Visual Effects
- Hover effects on cells and buttons
- Pulse animation on winning cells
- Celebration animation for wins
- Smooth transitions between states

## Project Structure

```
tic-tac-toe/
├── index.html      # Main HTML file
├── style.css       # CSS styles
├── script.js       # JavaScript game logic
└── README.md       # This documentation
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox, Grid, and animations
- **JavaScript (ES6)** - Game logic and interactivity
- **Font Awesome** - Icons for UI elements
- **LocalStorage** - Persistent data storage

## Browser Compatibility

Works on all modern browsers:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Installation & Usage

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Start playing** - no build process or dependencies required

### Alternative: Run with Live Server
If you have VS Code with Live Server extension:
1. Open the project folder in VS Code
2. Right-click `index.html` and select "Open with Live Server"
3. The game will open in your default browser

## Future Enhancements

Potential features for future versions:
- [ ] AI opponent with difficulty levels
- [ ] Sound effects and background music
- [ ] Player name customization
- [ ] Game history and statistics
- [ ] Online multiplayer
- [ ] Tournament mode

## License

This project is open source and available for personal and educational use.

## Credits

Built with ❤️ using vanilla HTML, CSS, and JavaScript.

Font Awesome icons licensed under [Font Awesome Free License](https://fontawesome.com/license/free).

## Contributing

Feel free to fork this project and submit pull requests with improvements!

---

Enjoy the game! 🎮