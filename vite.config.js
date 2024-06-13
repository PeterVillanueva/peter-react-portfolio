import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let isProduction = process.env.NODE_ENV === 'production';
let base = isProduction ? '/' : '/peter-react-portfolio/'; // './' for GitHub Pages, '/' for Vercel

export default defineConfig({
  plugins: [react()],
  base,
})