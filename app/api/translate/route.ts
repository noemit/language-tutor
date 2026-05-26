import { NextRequest, NextResponse } from "next/server";
import { TranslationResponse } from "@/types";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

const SYSTEM_PROMPT = `You are a language tutor. Given a sentence and a target language, return ONLY a JSON object with two keys:
- "translation": string (natural translation)
- "flashcards": array of { front, back, context, tags[] }

Flashcard rules:
- For nouns, adjectives, and adverbs: create ONE flashcard with the word and its meaning.
- For VERBS: create 3-4 flashcards in COMPLETE SENTENCE form, each conjugating the verb for a different person and tense. Examples:
  - Present, 1st person: "Yo como paella." → "I eat paella."
  - Present, 2nd person: "Tú comes muy rápido." → "You eat very fast."
  - Past, 1st person: "Yo comí en ese restaurante." → "I ate at that restaurant."
  - Future or conditional, any person: "Ella comerá mañana." → "She will eat tomorrow."
  Each verb flashcard must be a natural, self-contained sentence.
  Tag verb flashcards: ["verb", "conjugation", "{tense}", "{person}"]

Front = the text in the source language.
Back = the text in the target language.
Context = the original sentence being translated.
Tags = one of ["vocabulary", "phrase", "grammar", "verb", "conjugation"] plus tense and person tags.

Return ONLY valid JSON. No markdown, no code fences, no extra text.`;

export async function POST(request: NextRequest) {
  if (!DEEPSEEK_API_KEY) {
    return NextResponse.json(
      { error: "DeepSeek API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { text, sourceLang, targetLang } = await request.json();

    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: "Missing required fields: text, sourceLang, targetLang" },
        { status: 400 }
      );
    }

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
          {
            role: "user",
            content: `Translate from ${sourceLang} to ${targetLang}:\n\n"${text}"`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error:", errorText);
      return NextResponse.json(
        { error: "Translation failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Empty response from DeepSeek" },
        { status: 500 }
      );
    }

    const parsed: TranslationResponse = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
