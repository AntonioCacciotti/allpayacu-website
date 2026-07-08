import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jungle: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#0c6438',
          600: '#0a5430',
          700: '#083f24',
          900: '#052919',
          cream: '#fff9ae',
        },
        earth: {
          red: '#99242a',
          orange: '#e5852a',
          'orange-light': '#ec8841',
          'red-warm': '#e14d43',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'jungle-gradient': 'linear-gradient(135deg, #052919 0%, #083f24 40%, #0c6438 70%, #0a5430 100%)',
        'earth-gradient': 'linear-gradient(135deg, #e14d43 0%, #ec8841 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
export default config;
