export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './slices/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#EDE4D3',
        sand: '#E2D6C3',
        warm: '#2C2520',
        deep: '#1E2A3A',
        bleu: '#1B3FA0',
        bronze: '#8B7355',
        paper: '#F4EEE3',
        ink: '#12152A',
        terra: { DEFAULT: '#C9502B', soft: '#EE8A63' },
        mat: '#1E5A44',
        gray: {
          DEFAULT: '#7A6B5D',
          light: '#A8998A',
          faint: '#E8E0D6',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
    },
  },
}
