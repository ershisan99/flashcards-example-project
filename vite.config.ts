import * as path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ReactCompilerConfig = {
  /* ... */
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
