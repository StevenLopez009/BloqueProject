import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      injectManifest: {
        swSrc: 'src/sw.js',
      },
      manifest: {
        name: 'GameFish',
        short_name: 'GameFish',
        description: 'leaderboard and market for GameFish',
        theme_color: '#fcbf49',
        icons: [
          {
            src: 'icons/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
    }
  }
})

