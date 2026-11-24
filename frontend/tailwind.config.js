/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          bg: '#05130b',
          dark: '#081c11',
          card: '#0c2718',
          border: 'rgba(34, 197, 94, 0.2)',
          accent: '#22c55e',
          neon: '#4ade80',
          emerald: '#10b981',
          lime: '#84cc16'
        }
      },
      animation: {
        'scan-line': 'scanLine 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scanLine: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.8' },
          '50%': { transform: 'translateY(100%)', opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(74, 222, 128, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
