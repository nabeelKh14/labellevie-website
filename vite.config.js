import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'X-Frame-Options': 'SAMEORIGIN',
  'Content-Security-Policy': [
    "default-src 'self'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
}

export default defineConfig({
  plugins: [react()],
  server: { headers: securityHeaders },
  preview: { headers: securityHeaders },
})
