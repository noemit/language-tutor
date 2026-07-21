import { NextRequest, NextResponse } from "next/server";
import { UnpackResponse } from "@/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

const SYSTEM_PROMPT = `You are a Spanish language tutor helping a learner who is a native Romanian/English speaker living in Spain for 7 years. She hears phrases in the wild, often mishears them, and freezes when she has to speak.

She will give you a phrase she THINKS she heard. Your job:
1. Decide what a native would actually have said — she may have misheard (e.g. she heard "falta dos años" but the native probably said "hace dos años" = "it's been 2 years", or "faltan dos años" = "there are 2 years LEFT" — the OPPOSITE meaning). Pick the most likely intended phrase and say so.
2. Explain it and turn it into a reusable chunk she can speak out loud.

Return ONLY a JSON object with these keys:
- "correctedPhrase": string — the phrase as a native would actually say it (fixes mishearings/agreement). If her phrase was already correct, return it unchanged. If you corrected it, append a short parenthetical note like "(probably hace, not falta)".
- "meaning": string — concise English meaning.
- "whenNativesSayIt": string — one or two sentences on register/context (who says it, when, how formal).
- "frame": string — the reusable construction with ___ slots, e.g. "Hace ___ que ___".
- "slots": array of strings — 2-4 example fills for the slots.
- "examples": array of exactly 3 objects { "spanish": string, "english": string } — everyday sentences from a parent's life in Spain: café, park with kids, school pickup, dog walk, hairdresser, doctor, shopping. Short, speakable, peninsular Spanish.
- "commonConfusions": array of 1-3 strings — lookalike traps, e.g. hace vs faltan, ser vs estar twists, words that sound similar but mean the opposite.

Rules:
- Prioritize peninsular (Spain) Spanish usage, not Latin American.
- Explicitly surface mishearing traps when relevant.
- Keep everything short and speakable — she practices out loud.
- Return ONLY valid JSON. No markdown, no code fences, no extra text.`;

function isValidUnpack(value: unknown): value is UnpackResponse {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  const isNonEmptyString = (s: unknown) => typeof s === "string" && s.trim().length > 0;
  return (
    isNonEmptyString(v.correctedPhrase) &&
    isNonEmptyString(v.meaning) &&
    isNonEmptyString(v.whenNativesSayIt) &&
    isNonEmptyString(v.frame) &&
    Array.isArray(v.slots) &&
    v.slots.length > 0 &&
    v.slots.every(isNonEmptyString) &&
    Array.isArray(v.examples) &&
    v.examples.length === 3 &&
    v.examples.every(
      (e: unknown) =>
        e &&
        typeof e === "object" &&
        isNonEmptyString((e as Record<string, unknown>).spanish) &&
        isNonEmptyString((e as Record<string, unknown>).english)
    ) &&
    Array.isArray(v.commonConfusions) &&
    v.commonConfusions.length >= 1 &&
    v.commonConfusions.length <= 3 &&
    v.commonConfusions.every(isNonEmptyString)
  );
}

async function unpackPhrase(phrase: string): Promise<UnpackResponse | null> {
  const response = await fetch(DEEPSEEK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Phrase I heard: "${phrase}"` },
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
    const parsed = JSON.parse(content);
    return isValidUnpack(parsed) ? parsed : null;
  } catch (err) {
    console.error("Failed to parse unpack response:", err);
    return null;
  }
}

export async function POST(request: NextRequest) {
  if (!DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: "DeepSeek API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { phrase } = await request.json();

    if (!phrase || typeof phrase !== "string" || !phrase.trim()) {
      return NextResponse.json(
        { error: "Missing required field: phrase" },
        { status: 400 }
      );
    }

    // One retry if the model returns malformed output
    const result =
      (await unpackPhrase(phrase.trim())) ?? (await unpackPhrase(phrase.trim()));

    if (!result) {
      return NextResponse.json(
        { error: "Failed to unpack the phrase" },
        { status: 502 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Unpack error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
