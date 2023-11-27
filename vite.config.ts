import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.MAIN_URL': JSON.stringify(
      process.env.MAIN_URL || 'https://pokeapi.co/api/v2/pokemon'
    ),
  },
});
