import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  preset: 'vercel-edge',
  routeRules: {
    '/': { redirect: '/api/v1/' },
    '/api/v1/**': {
      cors: true,
      headers: {
        'access-control-allow-methods': 'GET, OPTIONS',
        'x-perseus-powered-by': 'observerly',
        'x-perseus-api-version': 'v1.0.0@latest (2022-06-24)'
      }
    }
  },
  runtimeConfig: {
    db: {
      url: 'file:db.perseus.sqlite',
      authToken: ''
    }
  }
})
