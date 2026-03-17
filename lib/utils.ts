import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ilike sorgularında özel karakterleri escape et (%, _, \) */
export function escapeIlike(str: string): string {
  return str.replace(/[%_\\]/g, "\\$&");
}

/** JSON.parse wrapper — bozuk JSON olursa fallback döndürür */
export function safeJsonParse(str: string, fallback: unknown = null): unknown {
  try { return JSON.parse(str); } catch { return fallback; }
}
