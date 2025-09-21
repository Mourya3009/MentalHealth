import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Remove proxy configuration for production deployment
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://mentalhealth-zpq9.onrender.com',
  //       changeOrigin: true,
  //     },
  //   },
  // },
})
