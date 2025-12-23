// src/app/sitemap.js
import { createClient } from '@supabase/supabase-js'; // Gunakan library core langsung

export default async function sitemap() {
  const baseUrl = "https://sisangket.vercel.app";

  // 1. Inisialisasi Supabase Khusus Server (Tanpa Cookies/Auth Session)
  // Pastikan variabel environment ini ada di .env.local dan Vercel
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // 2. Ambil semua ID berita dari database
  const { data: articles } = await supabaseAdmin
    .from('articles')
    .select('id, updated_at');

  // 3. Mapping URL Berita
  const newsUrls = articles?.map((post) => ({
    url: `${baseUrl}/berita/${post.id}`,
    // Pastikan format tanggal valid. new Date() menjamin formatnya benar.
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) || [];

  // 4. Daftar halaman statis
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/profil`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
  ];

  return [...staticUrls, ...newsUrls];
}