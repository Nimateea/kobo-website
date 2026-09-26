/** Same design tokens as the original inline Tailwind config. */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        primary: { DEFAULT: '#592CBC', light: '#8F6BE0' },
        doly: {
          dark: '#000000', darker: '#000000', light: '#e5e5e5',
          neon: '#592CBC', gray: '#0b0b0b', muted: '#8a8a8a', darkgreen: '#1e1233',
        },
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at center 150%, rgba(89, 44, 188, 0.1) 0%, transparent 50%)',
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.5rem' },
    },
  },
};
