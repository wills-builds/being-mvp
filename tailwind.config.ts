import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#161620',
        card: '#212130',
        border: '#323245',
        orange: '#D16B3A',
        blue: '#3A7CA5',
        cream: '#F0E6D3',
        plum: '#7A5C8A',
        muted: '#9090A5',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
