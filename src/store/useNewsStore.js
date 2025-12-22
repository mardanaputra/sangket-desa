import { create } from 'zustand';

// HAPUS import supabase client dari sini agar "clean"
// import { supabase } from '@/utils/supabase/client'; 

const useNewsStore = create((set, get) => ({
  /* ================= STATE ================= */
  news: [],
  singleNews: null,
  categories: [],
  loading: false,
  error: null,

  /* ================= ACTIONS ================= */

  /**
   * Mengambil URL gambar.
   * Karena kita melepas supabase client, kita construct URL manual.
   * Pastikan ganti PROJECT_REF dengan ID project supabase kamu.
   */
  getImageUrl: (path) => {
    if (!path) return "/hero-buleleng.jpg";
    if (path.toString().startsWith('http')) return path;

    // Ganti dengan URL Project Supabase kamu
    // Format: https://[PROJECT_REF].supabase.co/storage/v1/object/public/[BUCKET_NAME]/[PATH]
    const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL; 
    const BUCKET_NAME = 'news_images'; 
    
    // Jika path belum full URL, gabungkan
    return `${PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`;
  },

  /**
   * Ambil daftar berita via API Next.js (Server Side)
   */
  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      // Panggil API Route kita sendiri
      const response = await fetch('/api/v1/articles');
      
      if (!response.ok) {
        throw new Error(`Gagal mengambil data: ${response.statusText}`);
      }

      const data = await response.json();
      set({ news: data, loading: false });

    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  /**
   * Ambil detail berita berdasarkan ID via API Next.js
   */
  fetchNewsById: async (id) => {
    set({ loading: true, error: null, singleNews: null });
    try {
      // Panggil API Route Dynamic [id]
      const response = await fetch(`/api/v1/articles/${id}`);

      if (!response.ok) {
        throw new Error('Artikel tidak ditemukan');
      }

      const data = await response.json();
      set({ singleNews: data, loading: false });

    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  /**
   * Ambil daftar kategori via API
   */
  fetchCategories: async () => {
    try {
      // Sesuaikan path ini dengan lokasi file route categories kamu
      // Misalnya: app/api/categories/route.ts -> '/api/categories'
      const response = await fetch('/api/v1/categories');
      
      if (!response.ok) throw new Error("Gagal load kategori");
      
      const data = await response.json();
      set({ categories: data });
    } catch (err) {
      console.error("Error Kategori:", err.message);
    }
  },

  clearSingleNews: () => set({ singleNews: null, error: null })
}));

export default useNewsStore;