# Hiragana Master 🎌

A modern, interactive web app for learning all 109 Japanese hiragana characters through flashcards and quizzes. Built with React, featuring spaced repetition, progress tracking, and mobile-optimized touch gestures.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 Live Demo

Deploy instantly to:
- **Vercel**: `npm run build` → deploy `dist/` folder
- **Netlify**: Same process
- **GitHub Pages**: See deployment section below

## Features

### 🔊 Audio Pronunciation (NEW!)
- **Web Speech API** integration for native Japanese pronunciation
- **Auto-play mode** - toggle in Settings to hear characters automatically
- Click speaker icon (🔊) on any flashcard or quiz to hear pronunciation
- **Visual feedback** - buttons pulse and change color while speaking
- Works offline, no audio files or API keys needed
- Supports all 109 hiragana characters
- Adjustable speech rate (0.8x for clearer learning pace)

### 📚 Complete Hiragana Set
- All 46 basic hiragana characters
- 25 dakuten/handakuten (voiced/semi-voiced) characters  
- 33 yōon combination characters (きゃ, しゅ, etc.)
- **109 total characters** to master

### 🎴 Flashcard Mode
- Self-paced learning with flip cards
- Choose specific character groups to practice
- **Weak Characters mode** - targets low-mastery characters (SRS-style)
- **Mnemonic hints** - visual memory aids for each character
- **Touch gestures** - swipe left/right to respond on mobile
- **Keyboard shortcuts** - Space to flip, arrows to respond
- Track "knew it" vs "still learning" for each card

### ❓ Quiz Mode
- **Reading Mode**: See hiragana → pick the romaji
- **Recognition Mode**: See romaji → pick the hiragana
- Multiple choice with immediate feedback
- **Keyboard shortcuts** - press 1-4 to answer, Space for next
- Score tracking and accuracy grades
- Streak counter for consecutive correct answers
- **Confetti celebration** for 80%+ scores 🎉

### 📊 Progress Tracking
- Overall mastery percentage
- Character-by-character statistics
- Visual grid with color-coded mastery levels
- Day streak tracking
- All progress saved to localStorage

### 🎨 Modern UI
- Clean, responsive design
- **Dark mode** support (toggle in Settings)
- Mobile-friendly navigation
- Smooth animations and transitions
- Japanese fonts for authentic display

### ⚙️ Settings
- **Dark Mode** - Switch between light/dark themes
- **Auto-play Audio** - Automatically play pronunciation when revealing flashcards
- **Progress Stats** - View total sessions, streak, mastery
- **Reset Progress** - Start fresh if needed

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

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Upload dist/ folder to Vercel or use Vercel CLI
```

### GitHub Pages
```bash
# Update vite.config.js to set base: '/hiragana-app/'
npm run build
# Push dist/ to gh-pages branch
```

### Netlify
```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

## Development Highlights

Built in **10+ iterations** with:
- Research-driven design based on proven learning apps
- Mobile-first responsive design
- Progressive enhancement (keyboard shortcuts, touch gestures)
- SRS-inspired weak character targeting
- 90+ character mnemonics for visual learning
- Celebration animations for motivation

## License

MIT License - feel free to use this project for learning!

## Acknowledgments

- Inspired by [Tofugu's Hiragana Guide](https://www.tofugu.com/japanese/learn-hiragana/)
- Google Fonts: Inter & Noto Sans JP
- Canvas Confetti for celebrations
