import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@hookform/resolvers/zod', 'react', 'react-dom', 'leaflet', 'react-leaflet']
    }
  }
});
