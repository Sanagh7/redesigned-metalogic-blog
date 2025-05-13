/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          },
        },
        'scale': {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(1.05)'
          },
        },
        'shine': {
          '0%': {
            backgroundPosition: '200% 0'
          },
          '100%': {
            backgroundPosition: '-200% 0'
          },
        },
        'scroll': {
          '0%': {
            transform: 'translateY(-100%)'
          },
          '100%': {
            transform: 'translateY(100%)'
          }
        },
        'spin-ease': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'scale': 'scale 0.3s ease-in-out forwards',
        'shine': 'shine 8s ease-in-out infinite',
        'scroll': 'scroll 2s ease-in-out infinite',
        'spin': 'spin-ease 1s linear infinite'
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
} 