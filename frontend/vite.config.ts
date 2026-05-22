import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      includeAssets: ['favicon.svg', 'pwa-192x192.svg', 'pwa-512x512.svg'],
      manifest: {
        name: 'University ERP — Fee Management System',
        short_name: 'UniERP',
        description: 'A complete university fee and campus management system. Manage students, faculty, courses, hostel, library, transport and finance.',
        theme_color: '#7c3aed',
        background_color: '#1a0a2e',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        orientation: 'any',
        scope: '/',
        start_url: '/?source=pwa',
        categories: ['education', 'productivity', 'utilities'],
        lang: 'en',
        dir: 'ltr',
        prefer_related_applications: false,
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'Dashboard',
            short_name: 'Dashboard',
            description: 'View the main dashboard',
            url: '/dashboard',
            icons: [{ src: 'pwa-192x192.svg', sizes: '192x192', type: 'image/svg+xml' }]
          },
          {
            name: 'Students',
            short_name: 'Students',
            description: 'Manage student records',
            url: '/dashboard/students',
            icons: [{ src: 'pwa-192x192.svg', sizes: '192x192', type: 'image/svg+xml' }]
          },
          {
            name: 'Finance',
            short_name: 'Finance',
            description: 'View finance and fees',
            url: '/dashboard/finance',
            icons: [{ src: 'pwa-192x192.svg', sizes: '192x192', type: 'image/svg+xml' }]
          }
        ]
      }
    })
  ],
})
