import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ilike sorgularında özel karakterleri escape et (%, _, \) */
export function escapeIlike(str: string): string {
  return str.replace(/[%_\\]/g, "\\$&");
}
