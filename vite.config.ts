import {VitePWA} from 'vite-plugin-pwa';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      pwaAssets: {disabled: false, config: true},
      manifest: {
        name: 'Shabu · Happiness',
        short_name: 'Shabu',
        description:
          'ຊາບູ ແລະ ຊ່ວງເວລາດີໆ · ໜ້າຮ້ານຕົວຢ່າງ',
        theme_color: '#ad392c',
        background_color: '#faf8f4',
        lang: 'lo',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,svg,png,ico,webp,ttf,woff,woff2}',
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {enabled: false},
    }),
  ],
  resolve: {alias: {'@': '/src'}},
});
