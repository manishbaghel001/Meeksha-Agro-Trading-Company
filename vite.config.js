import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT for GitHub Pages:
// If your repo is  github.com/<username>/meeksha-agro
// the site is served from  https://<username>.github.io/meeksha-agro/
// so `base` must match the repo name (with slashes).
// If you later attach a custom domain (www.meekshaagro.com), change base to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/meeksha-agro/',
})
