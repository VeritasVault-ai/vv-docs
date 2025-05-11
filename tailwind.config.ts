import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    // Target Docusaurus-specific directories
    "./veritasvault-docs/src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./veritasvault-docs/docs/**/*.{md,mdx}",
    "./veritasvault-docs/blog/**/*.{md,mdx}",
    "./veritasvault-docs/pages/**/*.{js,jsx,ts,tsx}",
    
    // Include components that might be used in MDX
    "./veritasvault-docs/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a90e2',
        secondary: '#f5a623',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;