import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 54684,
    host: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
})
