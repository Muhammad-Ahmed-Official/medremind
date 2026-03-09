/** @type {import('tailwindcss').Config} */
module.exports = {
  // Yahan par woh saare paths honay chahiye jahan aap Tailwind / NativeWind ki classes use kar rahe hain.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}