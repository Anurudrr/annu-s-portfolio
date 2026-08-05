import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3001,
    host: "0.0.0.0"
  },
  build: {
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-helmet-async'],
          'vendor-motion': ['motion', 'motion/react'],
          'vendor-ui': ['lucide-react'],
          'vendor-form': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-ai': ['@google/genai'],
          'gallery': ['./src/components/PolaroidGallery.tsx'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 500
  },
  esbuild: {
    treeShaking: true,
    pure: ['console.log', 'console.debug', 'console.info']
  }
});
