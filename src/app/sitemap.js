// src/app/sitemap.js
import { supabase } from "@/utils/supabase/client";

export default async function sitemap() {
  const baseUrl = "https://desasangket.id";

  // 1. Ambil semua ID berita dari database
  const { data: articles } = await supabase
    .from('articles')
    .select('id, updated_at');

  const newsUrls = articles?.map((post) => ({
    url: `${baseUrl}/berita/${post.id}`,
    lastModified: post.updated_at || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  })) || [];

  // 2. Daftar halaman statis
  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/profil`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/layanan`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/berita`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  return [...staticUrls, ...newsUrls];
}