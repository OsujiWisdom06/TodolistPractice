import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png'
      ],
      manifest: {
        name: 'Todo-List',
        short_name: 'Todo-List',
        description: 'A Progressive Web App built with Vite and React',
        theme_color: '#ffffff',
        background_color: 'yellow',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'zscoutlogo192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'zsoutlogo512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'zsoutlogo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
});