import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  base: '/open-campus/',
  esbuild: {
    // Игнорировать ошибки TypeScript во время сборки
    legalComments: "none",
    drop: ["console", "debugger"],
  },
})
