<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices. 
<!-- END:nextjs-agent-rules -->

## Project conventions

- Static learning content lives in `lib/*-data.ts` as typed consts, generated via `node scripts/generate-content.mjs frames|tense [--write]` (DeepSeek, output in gitignored `scripts/out/`) and committed only after manual review.
- Shared types live in `types/index.ts`.
- Persistence is dual-backend: `lib/db.ts` (Firestore) and `lib/local-db.ts` (local). Any new persistence method must be added to both together.
