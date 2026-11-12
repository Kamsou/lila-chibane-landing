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
        ciel: 'rgb(var(--ciel, 238 239 251) / <alpha-value>)',
        nuage: 'rgb(var(--nuage, 248 248 254) / <alpha-value>)',
        brume: 'rgb(var(--brume, 211 215 242) / <alpha-value>)',
        azur: 'rgb(var(--azur, 47 71 184) / <alpha-value>)',
        corail: 'rgb(var(--accent, 162 89 217) / <alpha-value>)',
        encre: 'rgb(var(--encre, 23 31 77) / <alpha-value>)',
        ardoise: 'rgb(var(--ardoise, 83 89 138) / <alpha-value>)',
        gray: {
          DEFAULT: '#7A6B5D',
          light: '#A8998A',
          faint: '#E8E0D6',
        },
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        titre: ['DM Sans', 'system-ui', 'sans-serif'],
        plume: ['Instrument Serif', 'Georgia', 'serif'],
      },
    },
  },
}
