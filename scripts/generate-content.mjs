#!/usr/bin/env node
// Content generation pipeline for frame drills and tense-of-the-day entries.
// Usage: node scripts/generate-content.mjs frames|tense [--write]
//
// Calls DeepSeek (same pattern as app/api/quiz-variant/route.ts), validates the
// output, retries once on malformed responses, and writes candidates to
// scripts/out/<kind>.json for review. With --write it additionally emits
// scripts/out/<kind>.ts — an exported typed const ready to paste into lib/.
// It NEVER writes into lib/ automatically.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "scripts", "out");
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

// --- env ---

function loadApiKey() {
  try {
    const env = readFileSync(join(ROOT, ".env.local"), "utf8");
    for (const line of env.split("\n")) {
      const m = line.match(/^\s*DEEPSEEK_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) return m[1].replace(/^["']|["']$/g, "");
    }
  } catch {
    // .env.local missing or unreadable — fall back to the environment
  }
  return process.env.DEEPSEEK_API_KEY ?? null;
}

const API_KEY = loadApiKey();
if (!API_KEY) {
  console.error("DEEPSEEK_API_KEY not found in .env.local or environment");
  process.exit(1);
}

// --- DeepSeek call (mirrors app/api/quiz-variant/route.ts) ---

async function callDeepSeek(systemPrompt, userPrompt) {
  const response = await fetch(DEEPSEEK_URL, {
    method: "POST",
    signal: AbortSignal.timeout(60_000),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    console.error("DeepSeek API error:", await response.text());
    return null;
  }

  try {
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch (err) {
    console.error("Failed to parse DeepSeek response:", err.message);
    return null;
  }
}

// One retry on malformed output
async function generate(systemPrompt, userPrompt, isValid) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    const parsed = await callDeepSeek(systemPrompt, userPrompt);
    const items = parsed?.items;
    if (isValid(items)) return items;
    if (process.env.DEBUG) {
      console.error("  raw output:", JSON.stringify(parsed?.items ?? parsed, null, 1).slice(0, 1500));
    }
    console.error(`  attempt ${attempt}: malformed output, ${attempt < 2 ? "retrying" : "giving up"}`);
  }
  return null;
}

// --- validation ---

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function countSlots(template) {
  return (template.match(/___/g) ?? []).length;
}

function isValidFrameItem(f) {
  return (
    f &&
    isNonEmptyString(f.id) &&
    isNonEmptyString(f.scenario) &&
    isNonEmptyString(f.template) &&
    isNonEmptyString(f.english) &&
    countSlots(f.template) >= 1 &&
    countSlots(f.template) <= 3 &&
    Array.isArray(f.slots) &&
    f.slots.length === countSlots(f.template) &&
    f.slots.every((s) => Array.isArray(s) && s.length >= 2 && s.length <= 4 && s.every(isNonEmptyString)) &&
    Array.isArray(f.variants) &&
    // spec asks 4-6; accept 3 and top up during manual review
    f.variants.length >= 3 &&
    f.variants.length <= 6 &&
    f.variants.every((v) => v && isNonEmptyString(v.spanish) && isNonEmptyString(v.english)) &&
    isNonEmptyString(f.tense) &&
    isNonEmptyString(f.note)
  );
}

function isValidFrames(items) {
  if (!Array.isArray(items) || items.length < 5) {
    if (process.env.DEBUG && Array.isArray(items))
      console.error(`  reject: got ${items.length} items, expected 5`);
    return false;
  }
  const bad = items.filter((f) => !isValidFrameItem(f));
  if (process.env.DEBUG)
    for (const f of bad)
      console.error(`  dropping invalid item ${f?.id} (variants=${f?.variants?.length}, slots=${JSON.stringify(f?.slots?.map((s) => s?.length))}, template=${f?.template})`);
  // keep the pack if at least 4 of 5 items are salvageable
  return items.length - bad.length >= 4;
}

function isValidTense(items) {
  if (!Array.isArray(items) || items.length < 2) return false;
  return items.every(
    (e) =>
      e &&
      isNonEmptyString(e.id) &&
      isNonEmptyString(e.verb) &&
      isNonEmptyString(e.en) &&
      isNonEmptyString(e.present) &&
      isNonEmptyString(e.preterite) &&
      isNonEmptyString(e.imperfect) &&
      isNonEmptyString(e.future)
  );
}

// --- prompts ---

const LEARNER_CONTEXT = `The learner is a native Romanian/English speaker who has lived in Spain for 7 years. She is stuck in the present tense and freezes when speaking. Everything must be everyday Spain Spanish (not Latin American): vosotros forms where relevant, Spain vocabulary (zumo not jugo, vale, coger the bus is fine), short natural sentences a parent would actually say OUT LOUD in daily life. No textbook stiffness, no subjunctive gymnastics.`;

const SCENARIOS = [
  ["cafe", "ordering and chatting in a café/bar — coffee, tostada, asking for the bill, small requests"],
  ["dog-walk-park", "walking the dog / at the park with kids — talking to other dog owners and parents"],
  ["school-parents", "school gate and talking to teachers/other parents — pickups, homework, meetings"],
  ["hairdresser", "at the hairdresser — describing the cut, small talk while waiting"],
  ["doctor-pharmacy", "doctor's appointment and pharmacy — symptoms, prescriptions, dosage"],
  ["shopping", "shopping — supermarket, market stalls, clothes, sizes, prices, returns"],
  ["neighbors-small-talk", "small talk with neighbors — hallway, elevator, weather, weekend plans"],
];

function framesSystemPrompt() {
  return `You are a language tutor creating "frame drills" for a Spanish learner. A frame is a reusable base-construction sentence with 1-2 swappable slots (marked ___).

${LEARNER_CONTEXT}

Return ONLY a JSON object with one key:
- "items": array of exactly 5 frame objects, each with:
  - "id": unique kebab-case id starting with the scenario, e.g. "cafe-cortado-sin-azucar"
  - "scenario": the scenario id given in the user message
  - "template": Spanish sentence containing 1-2 "___" slots, e.g. "¿Me pones ___ con ___?"
  - "english": base meaning of the template
  - "slots": array with one entry per ___ slot; each entry is an array of 2-3 fill options
  - "variants": 4-6 pre-filled { "spanish", "english" } pairs actually produced by filling the slots with the given options. Include at least one preterite and one imperfect variant where natural for this frame.
  - "tense": short tag, e.g. "present", "preterite", "imperfect", "mixed past"
  - "note": one line of usage nuance (register, a trap, a regional note)

Rules:
- Sentences must be SHORT — things a parent says in one breath.
- Every variant must be a grammatical filling of the template using the slot options.
- Return ONLY valid JSON. No markdown, no code fences, no extra text.`;
}

function tenseSystemPrompt() {
  return `You are a language tutor creating "tense of the day" drill entries for a Spanish learner.

${LEARNER_CONTEXT}

Return ONLY a JSON object with one key:
- "items": array of exactly 3 entry objects, each with:
  - "id": unique kebab-case id, e.g. "ir-parque-ninos"
  - "verb": the infinitive given in the user message
  - "en": a short everyday English sentence describing a concrete situation from family life in Spain
  - "present": the same situation as a natural Spanish sentence in the present tense
  - "preterite": the same situation in the preterite (adjust time markers naturally, e.g. "ayer")
  - "imperfect": the same situation in the imperfect (habitual or background, e.g. "de pequeña", "antes")
  - "future": the same situation in the simple future (e.g. "mañana")

Rules:
- The four Spanish sentences must express roughly the same everyday situation, only the tense/time marker changes.
- Conjugations must be correct — watch irregulars (fui, hice, estuve, tuve, dije, pude, me puse).
- Use first person or "we/the kids" subjects mostly.
- Each entry a DIFFERENT situation from the other entries.
- Return ONLY valid JSON. No markdown, no code fences, no extra text.`;
}

const TENSE_VERBS = [
  "ir", "hacer", "estar", "tener", "quedarse", "poder", "decir", "venir", "ponerse", "llevar",
];

// --- TS emission ---

function toTs(kind, items) {
  const json = JSON.stringify(items, null, 2);
  if (kind === "frames") {
    return `import { Frame } from "@/types";\n\nexport const FRAMES: Frame[] = ${json};\n`;
  }
  return `import { TenseEntry } from "@/types";\n\nexport const TENSE_ENTRIES: TenseEntry[] = ${json};\n`;
}

// --- main ---

async function main() {
  const [kind, ...flags] = process.argv.slice(2);
  if (!["frames", "tense"].includes(kind)) {
    console.error("Usage: node scripts/generate-content.mjs frames|tense [--write]");
    process.exit(1);
  }
  const writeTs = flags.includes("--write");
  mkdirSync(OUT_DIR, { recursive: true });

  let all = [];
  if (kind === "frames") {
    const seen = new Set();
    for (const [id, desc] of SCENARIOS) {
      console.log(`Generating frames for scenario "${id}"...`);
      const items = await generate(
        framesSystemPrompt(),
        `Scenario id: "${id}" — ${desc}\nGenerate exactly 5 frames for this scenario.`,
        isValidFrames
      );
      if (!items) {
        console.error(`FAILED scenario "${id}" — skipping`);
        continue;
      }
      for (const f of items) {
        if (!isValidFrameItem(f)) continue;
        f.scenario = id;
        if (seen.has(f.id)) {
          console.error(`  duplicate id "${f.id}" — dropping`);
          continue;
        }
        seen.add(f.id);
        all.push(f);
      }
    }
  } else {
    const seen = new Set();
    for (const verb of TENSE_VERBS) {
      console.log(`Generating tense entries for verb "${verb}"...`);
      const items = await generate(
        tenseSystemPrompt(),
        `Verb: "${verb}"\nGenerate exactly 3 entries for this verb.`,
        isValidTense
      );
      if (!items) {
        console.error(`FAILED verb "${verb}" — skipping`);
        continue;
      }
      for (const e of items) {
        e.verb = verb;
        if (seen.has(e.id)) {
          console.error(`  duplicate id "${e.id}" — dropping`);
          continue;
        }
        seen.add(e.id);
        all.push(e);
      }
    }
  }

  const jsonPath = join(OUT_DIR, `${kind}.json`);
  writeFileSync(jsonPath, JSON.stringify(all, null, 2) + "\n");
  console.log(`Wrote ${all.length} ${kind} candidates to ${jsonPath}`);

  if (writeTs) {
    const tsPath = join(OUT_DIR, `${kind}.ts`);
    writeFileSync(tsPath, toTs(kind, all));
    console.log(`Wrote TypeScript snippet to ${tsPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
