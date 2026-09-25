/** Same design tokens as the original inline Tailwind config. */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        primary: { DEFAULT: '#592CBC', light: '#8F6BE0' },
        doly: {
          dark: '#0c0c0c', darker: '#0a0a0a', light: '#e5e5e5',
          neon: '#592CBC', gray: '#1a1a1a', muted: '#888888', darkgreen: '#1e1233',
        },
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at center 150%, rgba(89, 44, 188, 0.1) 0%, transparent 50%)',
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
    },
  },
};
