/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('tailwindcss'),
    require('prettier-plugin-tailwindcss')
  ]
}
export default config
