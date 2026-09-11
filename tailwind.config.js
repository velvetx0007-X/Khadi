/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khadi: {
          50: '#FDFBF7',
          100: '#F8F4EC',
          200: '#EFE7D7',
          300: '#E0D0B6',
          400: '#Cbb189',
          500: '#C86D27', // Main Khadi Earth Warm Accent
          600: '#B45A1C',
          700: '#944415',
          800: '#773516',
          900: '#612C16',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E3EBE3',
          500: '#059669', // Sustainability emerald
          600: '#047857',
        },
        cotton: {
          warm: '#FDFBF7',
          card: '#FFFFFF',
          border: '#EBE5D9'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(180, 90, 28, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 20px rgba(5, 150, 105, 0.2)',
        'khadi-glow': '0 0 20px rgba(200, 109, 39, 0.25)'
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
