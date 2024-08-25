import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    terserOptions: {
      keep_classnames: true,
      keep_fnames: true,
    },
    sourcemap: true // Add this line to enable source maps
  },
  plugins: [react()],
})
