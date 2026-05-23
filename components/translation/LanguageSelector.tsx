"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/lib/languages";
import { LanguageCode } from "@/types";

interface LanguageSelectorProps {
  value: LanguageCode;
  onChange: (value: LanguageCode) => void;
  label?: string;
}

export function LanguageSelector({
  value,
  onChange,
  label,
}: LanguageSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      )}
      <Select value={value} onValueChange={(v) => onChange(v as LanguageCode)}>
        <SelectTrigger className="w-full bg-card border-border rounded-xl h-11 text-sm font-medium">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {LANGUAGES.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="rounded-lg text-sm"
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
