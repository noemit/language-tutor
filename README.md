# Language Tutor

A personal progressive web app for translating text and automatically generating flashcards to build vocabulary over time.

![Language Tutor](https://img.shields.io/badge/built%20with-Next.js-black?logo=next.js)
![Firebase](https://img.shields.io/badge/optional-Firebase-orange?logo=firebase)
![DeepSeek](https://img.shields.io/badge/translation-DeepSeek-blue)

## What it does

1. **Translate** — Paste text in Spanish, Romanian, Galician, or English and get a natural translation powered by DeepSeek.
2. **Auto-generate flashcards** — The LLM intelligently extracts words, phrases, and grammar concepts worth learning and creates flashcards automatically.
3. **Practice** — Flip through flashcards, self-assess with "Again" or "Good", and track your progress.
4. **Archive** — Cards you master (7 correct in a row) automatically move to your archive. Restore them anytime if you feel rusty.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Storage**: localStorage by default; optional Firebase (Auth + Firestore) for cloud sync and push notifications
- **Translation & Flashcard Generation**: DeepSeek Chat API
- **PWA**: Installable on iOS and Android

## Quick Start (localStorage only, no account needed)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Everything works immediately — all data is saved to your browser's localStorage. No sign-up, no API keys required (except DeepSeek for translations).

## Environment Variables

Create a `.env.local` file with:

```env
# Required for translations
DEEPSEEK_API_KEY=your_deepseek_api_key

# Optional — only needed for cloud sync, multi-device, and push notifications
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**If you skip the Firebase variables**, the app runs entirely offline with localStorage. All your translations, flashcards, quiz results, and concept progress are saved in your browser. The header shows "Local" with a 💾 icon.

**If you add Firebase variables**, the app auto-detects them on next restart and switches to cloud mode — Google sign-in appears, data syncs across devices, and push notification reminders become available.

> ⚠️ Never commit real Firebase keys. `.env*.local` files are gitignored.

## Deploy

The app is configured for [Vercel](https://vercel.com/).

1. Push to GitHub
2. Import repo in Vercel
3. Add `DEEPSEEK_API_KEY` environment variable (required)
4. Optionally add Firebase `NEXT_PUBLIC_*` variables for cloud features

## PWA Install

Open the deployed app in Safari (iOS) or Chrome (Android) and tap **Add to Home Screen**.

---

## Customizing with an AI Agent

This app was built with an AI coding agent and is designed to be easily customized by giving natural-language instructions. Below is a catalog of every hardcoded decision and the instruction you would give your agent to change it.

### 🗣 Language Orientation

The app currently assumes **Spanish → English** as the primary learning pair. All defaults, concepts, quizzes, and keyword detection are hardcoded for this language direction.

#### Switch the entire app to a different language pair

> **Instruction for your AI agent:** "Change this app from a Spanish→English tutor to a [YOUR TARGET LANGUAGE]→[YOUR NATIVE LANGUAGE] tutor. Update the default source and target languages, the language list, all 22 grammar/concept lessons and their quizzes, the auto-suggestion keyword matching system, and the DeepSeek system prompt. Replace every Spanish example with equivalent content in [YOUR TARGET LANGUAGE] and every English translation with [YOUR NATIVE LANGUAGE]."

**Files to change:**
| File | What's Hardcoded |
|------|-----------------|
| `types/index.ts` | `LANGUAGES` array (en, ro, es, gl), `DEFAULT_SOURCE_LANG = "es"`, `DEFAULT_TARGET_LANG = "en"` |
| `app/api/translate/route.ts` | `SYSTEM_PROMPT` instructs DeepSeek about translation direction and flashcard tags `["vocabulary", "phrase", "grammar"]` |
| `app/page.tsx` | `CONCEPT_KEYWORDS` — 22 concept detectors with Spanish-specific keywords (e.g., `"estuve"`, `"ojalá"`, `"vale"`). The `suggestConcepts()` function matches against these. |
| `lib/concepts-data.ts` | `CONCEPTS` array — 22 full lessons with Spanish examples, English translations, and English-language explanations. Covers ser/estar, subjunctive, false friends, colloquialisms, etc. |
| `lib/quiz-data.ts` | `QUIZZES` mapping — 3 quiz versions per concept, all in Spanish/English. |

#### Add or remove supported languages

> **Instruction:** "Add [LANGUAGE] to the supported language list with flag [EMOJI]." or "Remove [LANGUAGE] from the language selector."

**File:** `types/index.ts` — edit the `LANGUAGES` array.

#### Change which language is the default source/target

> **Instruction:** "Set the default source language to [CODE] and the default target to [CODE]."

**File:** `types/index.ts` — change `DEFAULT_SOURCE_LANG` and `DEFAULT_TARGET_LANG`.

---

### 🤖 AI Translation Provider

Currently using **DeepSeek Chat API**.

#### Change the LLM provider

> **Instruction:** "Replace DeepSeek with [OPENAI/CLAUDE/GEMINI]. Update the API endpoint, authentication header format, model name, and request body structure. Keep the same JSON response contract."

**File:** `app/api/translate/route.ts` — `DEEPSEEK_URL`, `Authorization` header format, `model: "deepseek-chat"`, `response_format: { type: "json_object" }`.

#### Change the system prompt / flashcard behavior

> **Instruction:** "Update the translation system prompt to also include [BEHAVIOR]. Change the flashcard output format to include [FIELD]." or "Change the flashcard tag categories from 'vocabulary/phrase/grammar' to [YOUR TAGS]."

**File:** `app/api/translate/route.ts` — `SYSTEM_PROMPT` constant and tag values.

---

### 🔥 Backend / Auth

Firebase is **optional**. Without it, everything saves to the browser's localStorage and works offline. Add Firebase env vars to get cloud sync, Google sign-in, and push notifications.

#### Connect your own Firebase project

> **Instruction:** "Add Firebase to this app. Here are my config values: apiKey=[...], authDomain=[...], projectId=[...]"

**File:** `.env.local` — add `NEXT_PUBLIC_FIREBASE_*` variables. The app detects them automatically on restart. No code changes needed.

**Files involved in Firebase integration (for reference):**
| File | Role |
|------|------|
| `lib/firebase.ts` | Reads env vars, initializes Firebase app/auth/firestore, exports `isFirebaseConfigured` |
| `lib/db.ts` | Dispatcher — routes to Firestore or localStorage depending on config |
| `lib/local-db.ts` | Full localStorage mirror of the Firestore API |
| `components/auth/AuthProvider.tsx` | If Firebase is configured: Google sign-in flow. If not: auto-creates a local user with a stable UUID. |
| `components/shared/AppHeader.tsx` | Shows user info (or "Local" in offline mode), toggles notifications |

#### Add/change auth providers

> **Instruction:** "Add email/password authentication alongside Google sign-in." or "Replace Google auth with GitHub auth."

**Files:** `lib/firebase.ts` (auth provider setup), `components/auth/AuthProvider.tsx` (sign-in method).

#### Switch between local and cloud mode

> **Instruction:** "Remove Firebase and switch to localStorage only." or "Add Firebase config for cloud sync."

**File:** `.env.local` — add or remove `NEXT_PUBLIC_FIREBASE_*` variables. The app auto-detects on startup.

---

### 🎨 Branding & Appearance

#### App name and metadata

> **Instruction:** "Rename the app to [NAME]. Update the title, description, PWA manifest, and any references in the UI."

**Files:** `app/layout.tsx` — `metadata.title`, `metadata.description`, `appleWebApp.title`. Also `public/manifest.json`.

#### Color scheme

> **Instruction:** "Change the theme color from #FDF8F0 to [COLOR]." or "Add a dark mode toggle."

**Files:** `app/layout.tsx` — `themeColor` in viewport. `app/globals.css` — Tailwind CSS variables and base styles. The design uses a warm cream (`bg-butter`), mint (`bg-mint`), and blush (`bg-blush`) palette.

#### Font

> **Instruction:** "Switch from Arimo to [FONT NAME] from Google Fonts."

**File:** `app/layout.tsx` — the Google Fonts `<link>` in `<head>` references Arimo.

---

### 🧠 Concepts & Quizzes

#### Add a new grammar concept with quiz

> **Instruction:** "Add a new concept '[TITLE]' for [LANGUAGE] learners about [TOPIC]. Include 3-4 paragraphs of explanation, 4-6 example sentence pairs, tips, and 3 quiz versions with 6 questions each."

**Files:** `lib/concepts-data.ts` — add entry to `CONCEPTS` array. `lib/quiz-data.ts` — add entry to `QUIZZES` object. `app/page.tsx` — add keyword detector to `CONCEPT_KEYWORDS` object.

#### Modify an existing concept

> **Instruction:** "Update the '[CONCEPT TITLE]' concept to also cover [TOPIC]. Fix the example that says '[WRONG EXAMPLE]'."

**Files:** `lib/concepts-data.ts` (content) and `lib/quiz-data.ts` (quiz questions for that concept ID).

#### Remove a concept

> **Instruction:** "Remove the '[CONCEPT TITLE]' concept entirely from the app, including its quizzes and keyword suggestions."

**Files:** `lib/concepts-data.ts`, `lib/quiz-data.ts`, `app/page.tsx` (CONCEPT_KEYWORDS entry).

---

### 📱 UI Text & Behavior

#### Change autosuggestion behavior

> **Instruction:** "When a translation is saved, suggest concepts based on [DIFFERENT CRITERIA] instead of keyword matching. Or increase/reduce the number of suggested concepts."

**File:** `app/page.tsx` — the `suggestConcepts()` function and `CONCEPT_KEYWORDS` object.

#### Change flashcard mastery threshold

> **Instruction:** "Change the mastery threshold from 7 correct in a row to [NUMBER]."

**File:** `app/flashcards/page.tsx` — line `if (newStreak >= 7)` in `handleAnswer`.

#### Change card styling or review flow

> **Instruction:** "Show an animation when a card is mastered." or "Add a 'hard' option alongside 'again' and 'good'." or "Shuffle cards differently."

**File:** `app/flashcards/page.tsx` — the answer buttons and session logic.

---

### 🏗 Architecture Notes

All custom data flows through these files — understanding them is the key to customizing:

| File | Purpose |
|------|--------|
| `types/index.ts` | All TypeScript interfaces and language constants |
| `lib/db.ts` | Dispatcher — calls Firestore or localStorage based on config |
| `lib/local-db.ts` | localStorage mirror of the full Firestore API |
| `lib/firebase.ts` | Firebase initialization from env vars, exports `isFirebaseConfigured` |
| `lib/concepts-data.ts` | 22 Spanish grammar/conversation concept lessons |
| `lib/quiz-data.ts` | 3 quiz versions per concept |
| `app/api/translate/route.ts` | DeepSeek API integration and LLM prompt |
| `app/page.tsx` | Translation page + concept suggestion engine |
| `app/flashcards/page.tsx` | Spaced-repetition flashcard practice |
| `app/concepts/page.tsx` | Concept browser, quiz player, self-assessment |
| `app/mastered/page.tsx` | Archived/mastered cards gallery |
| `app/layout.tsx` | Root layout, metadata, fonts, color theme |

All Firestore reads/writes require authentication. Security rules are not included in this repo — configure them in the Firebase console.
