# Language Tutor - Project Plan

> A personal-use progressive web app (PWA) for translating unknown text and automatically generating flashcards to build vocabulary over time.

---

## 1. Overview

| Item | Detail |
|------|--------|
| **Type** | Progressive Web App (PWA) |
| **Host** | Vercel |
| **Audience** | Personal use only |
| **Primary flow** | Paste text → Translate → Auto-generate flashcards → Practice flashcards → Archive mastered cards |

### Two Modes
1. **Translation Mode** (default): Google Translate-style UI. Paste text, pick source/target languages, get a translation.
2. **Flashcard Mode**: Review auto-generated cards. Track correctness history. Archive cards you consistently get right.

---

## 2. Visual Design Direction

Based on the reference images, the app should feel **warm, playful, and approachable** — like a friendly tutor, not a productivity tool.

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#FDF8F0` or `#FAF5ED` | Warm cream page background |
| `surface` | `#FFFFFF` | Cards, input fields |
| `surface-accent` | `#FEF3C7` (butter), `#FCE7F3` (blush), `#DCFCE7` (mint) | Flashcard tags, highlights, category pills |
| `primary` | `#16A34A` (soft green) or `#E11D48` (coral red) | CTAs, active states, success |
| `text-primary` | `#1F1F1F` | Headlines, body |
| `text-secondary` | `#6B6B6B` | Meta, captions |

### Shape & Texture
- **Radii**: `16px`–`24px` on cards and buttons, `12px` on smaller pills. No sharp corners.
- **Shadows**: Almost none — use 1px subtle borders (`rgba(0,0,0,0.04)`) or a very soft `0 2px 8px rgba(0,0,0,0.03)` to create depth without heaviness.
- **Organic accents**: Optional blobby SVG backgrounds or decorative shapes behind flashcards (inspired by the "Colorful Emotion Shapes" reference).

### Typography
- **Font**: System UI / Inter / Geist (Next.js default). Keep it simple and readable.
- **Scale**: Large, confident headlines. Translation result should be `text-xl`–`text-2xl`. Flashcard front should be `text-3xl`–`text-4xl` when practicing.
- **Weight**: Bold (`700`) for prompts, medium (`500`) for labels, regular (`400`) for meta.

### Layout Principles
- **Mobile-first**: This is a phone app you pull out quickly. Bottom nav, thumb-friendly buttons, large tap targets.
- **Whitespace**: Generous padding. The weather app reference shows how airy data can feel — we should mirror that in the archive/stats view.
- **Card-based**: Translation results, flashcards, and stats should all live inside rounded, soft containers.

### Motion
- **Flip animation**: 3D CSS flip for flashcards (`rotateY`), springy and responsive.
- **Page transitions**: Subtle slide-up or fade — nothing snappy or mechanical.

---

## 3. Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| **Framework** | Next.js 15 (App Router) | PWA support, static export, Vercel-native |
| **Language** | TypeScript | Type safety for data models |
| **Styling** | Tailwind CSS 4 | Utility-first, fast iteration |
| **Components** | shadcn/ui | Accessible, copy-paste components |
| **State / DB** | Firebase (Firestore + Auth) | Cloud sync, cross-device, auth, familiar stack |
| **Translation** | DeepSeek Chat API (LLM) | Unified translation + structured flashcard extraction in one call |
| **PWA** | `next-pwa` or custom service worker | Offline caching, installable |
| **Auth** | Firebase Authentication | Google sign-in (personal use) |
| **Icons** | Lucide React | Clean, consistent iconography |

### Language Setup
| Language | Code | Role |
|----------|------|------|
| English | `en` | Default target / your learning reference |
| Romanian | `ro` | Native speaker, occasional use |
| Spanish | `es` | **Default source** — what you're mostly learning |
| Galician | `gl` | Additional interest |

### Why an LLM for Translation?
Because you're already paying for DeepSeek, a single API call can do **both** translation *and* intelligent flashcard extraction. Instead of brittle string-splitting heuristics, the model can return exactly which words, phrases, and grammar concepts are worth drilling.

### Why Firebase over LocalStorage / Dexie
- **Cross-device sync**: Practice flashcards on your phone, review on your laptop.
- **Durability**: No risk of losing data on phone resets or browser cache clears.
- **Familiarity**: You already use Firebase in other projects.
- **Auth**: Simple Google sign-in means the app is tied to your account, not a specific browser.

---

## 4. Directory Structure

```
language-tutor/
├── app/
│   ├── page.tsx                 # Translation mode (default route)
│   ├── flashcards/
│   │   └── page.tsx             # Flashcard practice mode
│   ├── archive/
│   │   └── page.tsx             # Mastered / archived cards
│   ├── layout.tsx               # Root layout with nav + providers
│   ├── globals.css
│   └── manifest.ts              # PWA manifest (Next.js 15 metadata API)
├── components/
│   ├── ui/                      # shadcn/ui primitives
│   ├── translation/
│   │   ├── TranslationInput.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── TranslationResult.tsx
│   ├── flashcards/
│   │   ├── FlashcardDeck.tsx
│   │   ├── FlashcardCard.tsx
│   │   └── ProgressBadge.tsx
│   └── shared/
│       ├── BottomNav.tsx        # Switch between Translate / Flashcards / Archive
│       └── AppHeader.tsx
├── lib/
│   ├── firebase.ts              # Firebase app init, auth, Firestore client
│   ├── db.ts                    # Firestore helpers (CRUD, queries, converters)
│   ├── translations.ts          # DeepSeek API route + client helpers
│   ├── flashcard-engine.ts      # SRS / scoring logic
│   └── languages.ts             # Language definitions (4 initial)
├── types/
│   └── index.ts                 # Shared TypeScript interfaces
├── public/
│   ├── icons/                   # PWA icons (192x192, 512x512)
│   └── sw.js                    # Service worker (if not using next-pwa)
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 5. Data Models

### `Language` (enum / config)
```ts
type LanguageCode = 'en' | 'ro' | 'es' | 'gl';

interface LanguageConfig {
  code: LanguageCode;
  name: string;
  flag: string; // emoji
}

// Default pair: Spanish (source) → English (target)
const DEFAULT_SOURCE_LANG: LanguageCode = 'es';
const DEFAULT_TARGET_LANG: LanguageCode = 'en';
```

### `Translation`
```ts
interface Translation {
  id: string;           // UUID
  sourceText: string;
  translatedText: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  rawLlmResponse: string; // full model output (for debugging / re-parsing)
  createdAt: Timestamp; // Firestore server timestamp
  flashcardIds: string[]; // linked auto-generated cards
  userId: string;
}
```

### `Flashcard`
```ts
interface Flashcard {
  id: string;
  userId: string;
  front: string;        // prompt (word / phrase / concept)
  back: string;         // answer (translation / explanation)
  context?: string;     // optional: original sentence it came from
  langPair: [LanguageCode, LanguageCode]; // e.g., ['en', 'es']
  tags: string[];       // e.g., ['vocabulary', 'grammar', 'verb-conjugation']
  status: 'active' | 'archived';
  createdAt: Timestamp;
  archivedAt?: Timestamp;

  // SRS-lite stats (denormalized for quick querying)
  totalAttempts: number;
  correctStreak: number;
  lastAttemptAt?: Timestamp;
}
```

### `Attempt`
```ts
interface Attempt {
  id: string;
  userId: string;
  cardId: string;
  correct: boolean;
  timestamp: Timestamp;     // Firestore server timestamp
  direction: 'front-to-back' | 'back-to-front'; // future-proofing
}
```

---

## 6. Key Features & Behavior

### 5.1 Translation Mode (`/`)
- Two text areas: **Source** (top) and **Translation** (bottom).
- Language dropdowns above each area.
- "Swap languages" button.
- **Auto-generate flashcards** via DeepSeek on every translation:
  - Send the source text with a system prompt that asks for:
    1. A natural translation.
    2. A JSON array of flashcard objects (front, back, context, tags).
  - The LLM decides which words, phrases, and grammar patterns are most valuable to learn.
  - Parse the structured JSON, save cards to Firestore under the authenticated user's collection, show a toast: *"Created 5 flashcards"*

### 5.2 Flashcard Mode (`/flashcards`)
- Show cards with `status: 'active'`.
- Tap/click to flip (front → back).
- Self-assess with **Again** (wrong) or **Good** (right) buttons.
- Track every attempt in the `attempts` Firestore subcollection (or root collection with `userId` filter).
- Sorting options:
  - Newest first
  - Oldest / least practiced
  - Weakest first (lowest accuracy)

### 5.3 Auto-Archive Logic
- When `correctStreak >= 7` (configurable), automatically move card to archive.
- Set `status = 'archived'` and `archivedAt = now`.
- Archived cards are visible in the Archive view but no longer appear in practice.

### 5.4 Archive / Knowledge Base (`/archive`)
- Searchable list of mastered cards.
- Show mini sparkline or correctness history per card.
- Option to "Restore to active" if you feel rusty.

### 5.5 Settings (future, modal or `/settings`)
- Choose your 4 active languages.
- Configure archive threshold (default 7 correct streak).
- Export / import all data (JSON dump).

---

## 7. UI / UX Wireframes

### Bottom Navigation (persistent)
```
┌─────────────────────────────────────┐
│  [Translate]  [Flashcards]  [Archive] │
└─────────────────────────────────────┘
```

### Translation View
```
┌─────────────────────────────────────┐
│  [EN ▼]  ⇄  [ES ▼]                  │
├─────────────────────────────────────┤
│  Paste text here...                 │
│                                     │
├─────────────────────────────────────┤
│  [Translate Button]                 │
├─────────────────────────────────────┤
│  Resultado aquí...                  │
│                                     │
└─────────────────────────────────────┘
```

### Flashcard View
```
┌─────────────────────────────────────┐
│          ┌─────────────┐            │
│          │   perro     │            │
│          │   [tap]     │            │
│          └─────────────┘            │
│                                     │
│       [Again]        [Good]         │
└─────────────────────────────────────┘
```

---

## 8. API & External Services

### DeepSeek Chat API
- **Endpoint**: `https://api.deepseek.com/chat/completions`
- **Model**: `deepseek-chat` (cheap, fast) or `deepseek-reasoner` if you want deeper grammatical analysis.
- **API Key**: Stored in a Vercel environment variable (`DEEPSEEK_API_KEY`). Never shipped to the client.
- **Architecture**: Use a **Next.js API Route** (`app/api/translate/route.ts`) so the key stays server-side.
- **Prompt design** (system prompt):
  ```
  You are a language tutor. Given a sentence and a target language,
  return ONLY a JSON object with two keys:
    - "translation": string (natural translation)
    - "flashcards": array of { front, back, context, tags[] }
  Front = the unknown word/phrase in the source language.
  Back = meaning in the target language.
  Context = the original sentence.
  Tags = one of ["vocabulary", "phrase", "grammar"].
  ```
- **Rate limits**: DeepSeek is very generous; personal use will never hit limits.
- **Fallback**: If offline or API errors, show "translation unavailable" and allow retry. Firestore also supports offline persistence, so flashcard reviews can be queued locally and synced when the connection returns.

---

## 9. Implementation Phases

### Phase 0 - Scaffold (1 session)
- [ ] `npx create-next-app@latest` with TypeScript + Tailwind
- [ ] Initialize shadcn/ui
- [ ] Add Firebase dependencies (`firebase`)
- [ ] Set up PWA manifest + service worker boilerplate
- [ ] Configure static export for Vercel
- [ ] Set up Firebase project + grab config (store in Vercel env vars)

### Phase 1 - Translation Core (1-2 sessions)
- [ ] Build `/` translation UI
- [ ] Create `app/api/translate/route.ts` to proxy DeepSeek API (key stays server-side)
- [ ] Integrate DeepSeek Chat API with structured JSON response mode
- [ ] Language selector with 4 hardcoded languages
- [ ] Swap button
- [ ] Error / loading states

### Phase 2 - Flashcard Generation (1-2 sessions)
- [ ] Firestore schema: `users/{uid}/translations`, `users/{uid}/flashcards`, `users/{uid}/attempts`
- [ ] Firebase Auth (Google sign-in) with protected routes
- [ ] Parse structured flashcards from DeepSeek JSON response
- [ ] Auto-create cards on translation success
- [ ] Toast notification with card count

### Phase 3 - Flashcard Practice (1-2 sessions)
- [ ] Build `/flashcards` page
- [ ] Flip animation + Again/Good buttons
- [ ] Record attempts in Firestore (with offline persistence enabled)
- [ ] Real-time sync: review on one device, updates appear on another
- [ ] Sort / filter active deck

### Phase 4 - Archive & Stats (1 session)
- [ ] Auto-archive logic (streak >= 7)
- [ ] Build `/archive` page
- [ ] Per-card history visualization (simple bar/sparkline)
- [ ] Restore from archive

### Phase 5 - Polish & Deploy (1 session)
- [ ] PWA install prompts, offline page
- [ ] Responsive design pass
- [ ] Data export/import JSON
- [ ] Deploy to Vercel
- [ ] Add to Home Screen on phone, test E2E

---

## 10. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| DeepSeek API downtime / key issues | Add a fallback message; Firestore offline persistence keeps flashcards readable |
| Flashcard generation produces garbage cards | Start simple (whole sentence + word tokens); let user delete cards |
| Firebase account/project issues | Add JSON export/import in settings for backup/restore |
| Mobile keyboard covers translation input | Use `dvh` units, test on actual device |

---

## 11. Success Criteria

- [ ] Can open the app on a phone, paste text, and get a translation in < 3s.
- [ ] Every translation spawns at least 1 flashcard.
- [ ] Can practice flashcards offline after first load.
- [ ] Cards auto-archive after 7 correct answers in a row.
- [ ] Can view history and restore archived cards.
- [ ] App is installable as a PWA on iOS Safari and Android Chrome.
