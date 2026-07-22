import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // Real-device reference viewports (min-width) used for responsive QA —
        // see checklist.md section 14. Both sit below `sm`(640px).
        iphone12pro: '390px',
        s20ultra: '412px',
      },
      colors: {
        white: '#ffffff',
        text: {
          primary: '#0f172a',
          secondary: '#475569',
          tertiary: '#718096',
          brand: '#8b5fbf',
        },
        brand: {
          DEFAULT: '#8b5fbf',
          tertiary: '#a78bcc',
        },
        enterprise: {
          bg: '#02020a',
          'bg-alt': '#06060e',
          accent: '#6367b8',
          'accent-deep': '#333893',
          'indigo-700': '#171c6e',
          'indigo-900': '#060a4a',
          'indigo-950': '#000227',
        },
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        // Sizes are fluid (clamp) between mobile and the 1440px desktop design;
        // letter-spacing is em-based (Figma's -2.25% tracking) so it scales with size.
        h1: ['clamp(2.25rem, 1.35rem + 4.5vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.0225em', fontWeight: '600' }],
        'h2-strong': ['clamp(2rem, 1.3rem + 3.5vw, 3.5rem)', { lineHeight: '1', letterSpacing: '-0.0225em', fontWeight: '600' }],
        h2: ['clamp(1.875rem, 1.2rem + 3.4vw, 3.25rem)', { lineHeight: '1', letterSpacing: '-0.0225em', fontWeight: '600' }],
        h3: ['clamp(1.375rem, 1.1rem + 1.4vw, 2rem)', { lineHeight: '1', letterSpacing: '-0.0225em', fontWeight: '600' }],
        b1: ['clamp(1.125rem, 1rem + 0.6vw, 1.75rem)', { lineHeight: '1.5', letterSpacing: '-0.0225em', fontWeight: '400' }],
        b2: ['clamp(1rem, 0.9rem + 0.5vw, 1.5rem)', { lineHeight: '1.5', letterSpacing: '-0.0225em', fontWeight: '400' }],
        // Floor raised to 1rem(16px) for mobile readability (was 0.9375rem/15px); tracking
        // eased to -0.01em at this size since -0.0225em reads as cramped below 16px.
        b3: ['clamp(1rem, 0.85rem + 0.4vw, 1.25rem)', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '400' }],
      },
    },
  },
} satisfies Config
