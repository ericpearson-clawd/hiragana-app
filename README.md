# Hiragana Master 🎌

A modern, interactive web app for learning Japanese hiragana characters through flashcards and quizzes.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### 📚 Complete Hiragana Set
- All 46 basic hiragana characters
- 20 dakuten (voiced) characters
- 5 handakuten (semi-voiced) characters
- **76 total characters** to master

### 🎴 Flashcard Mode
- Self-paced learning with flip cards
- Choose specific character groups to practice
- Track "knew it" vs "still learning" for each card
- Shuffle mode for randomized practice

### ❓ Quiz Mode
- **Reading Mode**: See hiragana → pick the romaji
- **Recognition Mode**: See romaji → pick the hiragana
- Multiple choice with immediate feedback
- Score tracking and accuracy grades
- Streak counter for consecutive correct answers

### 📊 Progress Tracking
- Overall mastery percentage
- Character-by-character statistics
- Visual grid with color-coded mastery levels
- Day streak tracking
- All progress saved to localStorage

### 🎨 Modern UI
- Clean, responsive design
- Dark mode support
- Mobile-friendly navigation
- Smooth animations and transitions
- Japanese fonts for authentic display

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ericpearson/hiragana-app.git
cd hiragana-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing
- **CSS3** - Custom styling with CSS variables
- **localStorage** - Progress persistence

## Character Groups

| Group | Characters | Type |
|-------|------------|------|
| Vowels | あいうえお | Basic |
| K-row | かきくけこ | Basic |
| S-row | さしすせそ | Basic |
| T-row | たちつてと | Basic |
| N-row | なにぬねの | Basic |
| H-row | はひふへほ | Basic |
| M-row | まみむめも | Basic |
| Y-row | やゆよ | Basic |
| R-row | らりるれろ | Basic |
| W-row | わをん | Basic |
| G-row | がぎぐげご | Dakuten |
| Z-row | ざじずぜぞ | Dakuten |
| D-row | だぢづでど | Dakuten |
| B-row | ばびぶべぼ | Dakuten |
| P-row | ぱぴぷぺぽ | Handakuten |

## License

MIT License - feel free to use this project for learning!

## Acknowledgments

- Inspired by [Tofugu's Hiragana Guide](https://www.tofugu.com/japanese/learn-hiragana/)
- Google Fonts: Inter & Noto Sans JP
