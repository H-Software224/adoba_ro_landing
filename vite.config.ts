import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/app': path.resolve(dirname, './src/app'),
      '@/views': path.resolve(dirname, './src/views'),
      '@/widgets': path.resolve(dirname, './src/widgets'),
      '@/features': path.resolve(dirname, './src/features'),
      '@/entities': path.resolve(dirname, './src/entities'),
      '@/shared': path.resolve(dirname, './src/shared'),
    },
  },
})
