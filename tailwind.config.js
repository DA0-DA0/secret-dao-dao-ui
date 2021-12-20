module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  options: {
    safelist: [/data-theme$/],
  },
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [require('./styles/daisyui-themes.json')],
  },
}
