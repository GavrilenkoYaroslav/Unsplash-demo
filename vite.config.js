import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Unsplash-demo/",
  server: {
    port: 3000,
    open: true,
  },
  plugins: [svgr(), react()],
  build: {
    commonjsOptions: {
      include: ['tailwind-config.cjs', 'node_modules/**'],
    },
  },

  optimizeDeps: {
    include: ['tailwind-config'],
  },

  resolve: {
    alias: {
      'tailwind-config': path.resolve(__dirname, './tailwind.config.cjs'),
    },
  },

  module: {
    rules: [
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
})
