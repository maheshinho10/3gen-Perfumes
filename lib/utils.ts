import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Prefix a /public path with the Next.js basePath so assets work on GitHub Pages */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
export function assetPath(path: string): string {
  return `${BASE}${path}`
}
