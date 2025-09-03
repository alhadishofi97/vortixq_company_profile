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
        mono: ['JetBrains Mono', 'Iosevka', 'monospace'], // Extend the default monospace stack
        iosevka: ['JetBrains Mono', 'Iosevka', 'monospace'], // Custom monospace utility class
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'Arial', 'sans-serif'],
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
          cyan: '#00E5FF',
          purple: '#7C3AED',
        },
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 229, 255, 0.08)',
      },
      backgroundImage: {
        'radial-faded': 'radial-gradient(1000px 600px at 50% -200px, rgba(0,229,255,0.15), transparent 60%)',
        'grid-slate': 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
