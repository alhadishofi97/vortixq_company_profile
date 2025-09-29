/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Montserrat', 'system-ui', 'Arial', 'sans-serif'],
        display: ['var(--font-sans)', 'Montserrat', 'system-ui', 'Arial', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'card-bg': 'var(--card-bg)',
        border: 'var(--border)',
        muted: 'var(--muted)',
        accent: 'var(--accent)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        brand: {
          DEFAULT: 'var(--accent)',
          primary: '#0F0F0F',
          secondary: '#A59489',
          highlight1: '#C16B32',
          highlight2: '#969696',
          text1: '#ECE9E3',
          text2: '#FFFFFF',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(193, 107, 50, 0.08)',
        orange: '0 8px 30px rgba(193, 107, 50, 0.15)',
      },
      backgroundImage: {
        'radial-faded': 'radial-gradient(1000px 600px at 50% -200px, rgba(193,107,50,0.15), transparent 60%)',
        'grid-slate': 'linear-gradient(rgba(150,150,150,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(150,150,150,0.08) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
