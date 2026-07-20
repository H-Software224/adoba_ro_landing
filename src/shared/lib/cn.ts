import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Registers the custom typography scale (text-h1, text-b1, etc. from
// tailwind.config.ts) as font-size utilities — without this, tailwind-merge
// doesn't recognize them and can drop an unrelated text-color class instead.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-h1', 'text-h2-strong', 'text-h2', 'text-h3', 'text-b1', 'text-b2', 'text-b3'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
