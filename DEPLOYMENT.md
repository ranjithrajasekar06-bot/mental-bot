# Deployment Guide

## Quick Start for GitHub

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Advanced Mental Health Chatbot"
```

### 2. Connect to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/yourusername/advanced-mental-health-chatbot.git
git branch -M main
git push -u origin main
```

### 3. Development Setup
```bash
npm install
npm run dev
```

### 4. Build for Production
```bash
npm run build
npm run preview
```

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a Vite project
3. Deploy with zero configuration

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## Environment Variables
No environment variables required for basic functionality.

## Features Included
- ✅ Modern React 18 with TypeScript
- ✅ Advanced mental health support system
- ✅ Crisis detection and intervention
- ✅ Responsive chat interface
- ✅ Emotional intelligence
- ✅ Professional medical-grade design
- ✅ Mobile-friendly responsive design