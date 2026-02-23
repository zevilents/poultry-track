import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // WAJIB: Harus sama persis dengan nama repository di GitHub
  base: '/poultry-track/', 
})