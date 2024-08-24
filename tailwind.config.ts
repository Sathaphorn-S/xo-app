import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '1000': '1000ms',
      },
    },
    backgroundImage: {
      'gameboard-bg': "url('/background.png')", // Path relative to the public directory
    },
  },
  plugins: [],
};
export default config;
