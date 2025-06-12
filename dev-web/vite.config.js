import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['send.svg'],
      workbox: {
        // Don’t serve the portal shell for these URLs:
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          /^\/diplomacy($|\/)/, // bypass SW for /diplomacy and deeper paths
          /^\/dailyprophet($|\/)/, // bypass SW for /dailyprophet
        ],
        runtimeCaching: [
          {
            urlPattern: /^\/diplomacy\/.*$/,
            handler: 'NetworkOnly',
          },
        ],
        maximumFileSizeToCacheInBytes: 5_000_000,
      },
      manifest: {
        name: 'Dev Portal',
        short_name: 'DevPortal',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
          {
            src: 'send.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
})
