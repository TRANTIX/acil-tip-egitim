const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|above|prior)\s+(instructions|prompts)/i,
  /you\s+are\s+now/i,
  /new\s+instructions?:/i,
  /system\s*prompt/i,
  /forget\s+(all|your|previous)/i,
  /\bDAN\b/,
  /jailbreak/i,
  /pretend\s+you/i,
  /act\s+as\s+(if|a)/i,
  /roleplay\s+as/i,
];

export function sanitizeUserInput(input: string): string {
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      return "[Geçersiz girdi tespit edildi. Lütfen tıbbi bir soru veya aksiyon girin.]";
    }
  }
  return input;
}
