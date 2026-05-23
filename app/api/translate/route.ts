import { NextRequest, NextResponse } from "next/server";
import { TranslationResponse } from "@/types";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

const SYSTEM_PROMPT = `You are a language tutor. Given a sentence and a target language, return ONLY a JSON object with two keys:
- "translation": string (natural translation)
- "flashcards": array of { front, back, context, tags[] }

Front = the unknown word/phrase in the source language.
Back = meaning in the target language.
Context = the original sentence.
Tags = one of ["vocabulary", "phrase", "grammar"].

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
