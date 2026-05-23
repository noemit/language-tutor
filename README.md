# Language Tutor

A personal progressive web app for translating text and automatically generating flashcards to build vocabulary over time.

![Language Tutor](https://img.shields.io/badge/built%20with-Next.js-black?logo=next.js)
![Firebase](https://img.shields.io/badge/powered%20by-Firebase-orange?logo=firebase)
![DeepSeek](https://img.shields.io/badge/translation-DeepSeek-blue)

## What it does

1. **Translate** — Paste text in Spanish, Romanian, Galician, or English and get a natural translation powered by DeepSeek.
2. **Auto-generate flashcards** — The LLM intelligently extracts words, phrases, and grammar concepts worth learning and creates flashcards automatically.
3. **Practice** — Flip through flashcards, self-assess with "Again" or "Good", and track your progress.
4. **Archive** — Cards you master (7 correct in a row) automatically move to your archive. Restore them anytime if you feel rusty.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth & Database**: Firebase (Authentication + Firestore)
- **Translation & Flashcard Generation**: DeepSeek Chat API
- **PWA**: Installable on iOS and Android

## Languages

| Code | Language | Role |
|------|----------|------|
| `es` | Spanish | Default source (what you're learning) |
| `en` | English | Default target (learning reference) |
| `ro` | Romanian | Native speaker support |
| `gl` | Galician | Additional interest |

## Environment Variables

Create a `.env.local` file with:

```env
DEEPSEEK_API_KEY=your_deepseek_api_key
```

Firebase config is baked into the client (safe for client-side use). Firestore security rules should restrict reads/writes to authenticated users.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

The app is configured for [Vercel](https://vercel.com/).

1. Push to GitHub
2. Import repo in Vercel
3. Add `DEEPSEEK_API_KEY` environment variable
4. Enable Google Sign-In in your Firebase project and add your Vercel domain to authorized domains

## PWA Install

Open the deployed app in Safari (iOS) or Chrome (Android) and tap **Add to Home Screen**.
