import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          gray: {
            white: '#FFFFFF',
            50: '#FAFAFA',
            100: '#F4F4F5',
            200: '#E4E4E7',
            300: '#D4D4D8',
            400: '#A1A1AA',
            500: '#71717A',
            600: '#52525B',
            700: '#3F3F46',
            800: '#27272A',
            900: '#181818',
            black: '#000000',
          },
          orange: {
            light: '#fff3ec',
            lightHover: '#ffede2',
            lightActive: '#ffdbc3',
            normal: '#ff8a3d',
            normalHover: '#e67c37',
            normalActive: '#cc6e31',
            dark: '#bf682e',
            darkHover: '#995325',
            darkActive: '#733e1b',
            darker: '#593015',
          }
        }
      },
    },
  },
  plugins: [],
} satisfies Config;