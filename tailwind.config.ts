import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        'off-white': '#FAFAF8',
        cream: '#F5F4F0',
        grass: '#4A6032',
        'grass-light': '#6B7B4C',
        'grass-dark': '#3A4A28',
        'olive-light': '#E8EBE0',
        sand: '#E5E2DA',
        charcoal: '#2D2D2D',
        dark: '#1A1A1A',
        gray: '#595959',
        'gray-light': '#767676',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
