import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: `${path.resolve(__dirname, './src/components/')}`,
      containers: `${path.resolve(__dirname, './src/containers/')}`,
      public: `${path.resolve(__dirname, './public/')}`,
      pages: path.resolve(__dirname, './src/pages'),
      types: `${path.resolve(__dirname, './src/types')}`,
      services: `${path.resolve(__dirname, './src/services/')}`,
      context: `${path.resolve(__dirname, './context/')}`,
      images: `${path.resolve(__dirname, './images/')}`,
    },
  },
  // server: {
  //   port: 3000,
  // },
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  },
  define: {
    'process.env': process.env,
  },
});
