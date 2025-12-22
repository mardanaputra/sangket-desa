export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // Jangan index folder API
    },
    sitemap: 'https://desasangket.id/sitemap.xml',
  }
}