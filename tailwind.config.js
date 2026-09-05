/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          darkblue: '#1D4ED8',
          navy: '#0F172A',
          teal: '#14B8A6',
          darkteal: '#0D9488',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          gold: '#F59E0B',
          amber: '#D97706',
          slate: '#64748B',
          lightslate: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 12px 40px 0 rgba(37, 99, 235, 0.12)',
        'glow-blue': '0 0 25px rgba(37, 99, 235, 0.35)',
        'glow-teal': '0 0 25px rgba(20, 184, 166, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
