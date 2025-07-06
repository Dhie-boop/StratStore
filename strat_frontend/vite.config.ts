import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@': path.resolve('./src'),
      'components': path.resolve('./src/components')
    }
  },
  build: {
    outDir: 'build'  
  }
})
