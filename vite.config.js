import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

let myconfig = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Shop in the shop',
    short_name: 'In The Shop',
    description: 'Shop app - categories - cloths - shoess - shirts',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),VitePWA(myconfig)],
  define: {
    'process.env.BUILD_VERSION': JSON.stringify(process.env.BUILD_VERSION || Date.now())
  }
})


