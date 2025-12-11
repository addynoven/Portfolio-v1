import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react(), tailwindcss()],

    server: {
      port: env.VITE_PORT ? Number(env.VITE_PORT) : 5173,
      headers: {
        'Cache-Control': 'no-store'
      }
    },

    resolve: {
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom')
      }
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'gsap-vendor': ['gsap', '@gsap/react'],
            'utils-vendor': ['axios', '@emailjs/browser']
          }
        }
      },
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
})
