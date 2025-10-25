# MaeStream Utilities

StreamElements API utilities for Twitch chat commands.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Deploy to Vercel:
   ```bash
   npx vercel
   ```

## Deployment

This project is configured to automatically deploy to Vercel when pushed to GitHub.

### First-time setup:
1. Create a new repository on GitHub
2. Link this repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```
3. Import your GitHub repository in Vercel dashboard (https://vercel.com)
4. Vercel will automatically deploy on every push to main

## Usage with StreamElements

Use your deployed API endpoints in StreamElements custom commands:

```
${customapi.https://your-app.vercel.app/api/example}
```

## Creating New Endpoints

Add new `.js` files in the `api/` folder. Each file becomes an endpoint automatically.

Example:
- `api/quote.js` → `https://your-app.vercel.app/api/quote`
