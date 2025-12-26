/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hau-blue': '#1e3a8a',
        'hau-blue-light': '#3b82f6',
        'hau-blue-dark': '#1e40af',
        'hau-dark': '#0f172a',
        'hau-muted': '#64748b',
        'hau-accent': '#f97316',
      },
      fontFamily: {
        sans: [
          'Be Vietnam Pro',
          'Inter',
          'Segoe UI',
          'system-ui',
          'sans-serif',
        ],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      lineHeight: {
        'relaxed': '1.75',
        'loose': '2',
      },
      letterSpacing: {
        'widest': '0.15em',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 2px 8px -2px rgba(0, 0, 0, 0.06)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.08)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}

