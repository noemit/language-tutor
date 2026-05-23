import {
  LanguageCode,
  LanguageConfig,
  LANGUAGES,
  DEFAULT_SOURCE_LANG,
  DEFAULT_TARGET_LANG,
} from "@/types";

export function getLanguageConfig(code: LanguageCode): LanguageConfig {
  const config = LANGUAGES.find((l) => l.code === code);
  if (!config) throw new Error(`Unknown language code: ${code}`);
  return config;
}

export function getLanguageName(code: LanguageCode): string {
  return getLanguageConfig(code).name;
}

export function getLanguageFlag(code: LanguageCode): string {
  return getLanguageConfig(code).flag;
}

export type { LanguageCode, LanguageConfig };
export { LANGUAGES, DEFAULT_SOURCE_LANG, DEFAULT_TARGET_LANG };
