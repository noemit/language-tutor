import { NextRequest, NextResponse } from "next/server";
import { CONCEPTS } from "@/lib/concepts-data";
import { QUIZZES } from "@/lib/quiz-data";
import { QuizQuestion } from "@/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

const SYSTEM_PROMPT = `You are a language tutor writing quiz questions for a Spanish learner who already has good vocabulary and gets bored by repetition.

Return ONLY a JSON object with one key:
- "questions": array of exactly 6 quiz question objects, each with:
  - "question": string — the prompt. Vary the format: translate Spanish→English, translate English→Spanish, fill in the blank, pick the correct conjugation, spot the error.
  - "options": array of exactly 4 plausible strings (one correct, three believable distractors).
  - "correctIndex": number 0-3 — index of the correct option. Vary it across questions.
  - "explanation": string — one or two sentences explaining WHY the correct answer is right.

Rules:
- Test the concept described by the user message, at the same difficulty as the provided sample questions.
- Write completely NEW questions — do not reuse or lightly rephrase the sample questions.
- Use natural, everyday Spanish a learner would actually say out loud.
- Return ONLY valid JSON. No markdown, no code fences, no extra text.`;

function isValidQuestions(value: unknown): value is QuizQuestion[] {
  if (!Array.isArray(value) || value.length !== 6) return false;
  return value.every(
    (q) =>
      q &&
      typeof q.question === "string" &&
      q.question.trim().length > 0 &&
      Array.isArray(q.options) &&
      q.options.length === 4 &&
      q.options.every((o: unknown) => typeof o === "string" && o.trim().length > 0) &&
      Number.isInteger(q.correctIndex) &&
      q.correctIndex >= 0 &&
      q.correctIndex <= 3 &&
      typeof q.explanation === "string" &&
      q.explanation.trim().length > 0
  );
}

async function generateQuestions(userPrompt: string): Promise<QuizQuestion[] | null> {
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
    const parsed = JSON.parse(content);
    return isValidQuestions(parsed.questions) ? parsed.questions : null;
  } catch (err) {
    console.error("Failed to parse generated quiz:", err);
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
    const { conceptId } = await request.json();
    const concept = CONCEPTS.find((c) => c.id === conceptId);
    if (!concept) {
      return NextResponse.json({ error: "Unknown conceptId" }, { status: 404 });
    }

    const sampleQuestions = QUIZZES[conceptId]?.[0]?.questions ?? [];
    const userPrompt = `Concept: "${concept.title}" — ${concept.subtitle}

Lesson content:
${concept.content.join("\n")}

Example sentences from the lesson:
${concept.examples.map((e) => `- ${e.spanish} → ${e.english}`).join("\n")}

Sample questions (for style and difficulty only — write NEW ones):
${JSON.stringify(sampleQuestions, null, 2)}`;

    // One retry if the model returns malformed output
    const questions =
      (await generateQuestions(userPrompt)) ?? (await generateQuestions(userPrompt));

    if (!questions) {
      return NextResponse.json(
        { error: "Failed to generate a valid quiz variant" },
        { status: 502 }
      );
    }

    return NextResponse.json({ conceptId, questions });
  } catch (error) {
    console.error("Quiz variant error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
