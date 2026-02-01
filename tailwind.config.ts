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
        grass: '#6B7B4C',
        'grass-light': '#8A9B6B',
        'grass-dark': '#4A5A35',
        'olive-light': '#E8EBE0',
        sand: '#E5E2DA',
        charcoal: '#2D2D2D',
        dark: '#1A1A1A',
        gray: '#6B6B6B',
        'gray-light': '#9A9A9A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
