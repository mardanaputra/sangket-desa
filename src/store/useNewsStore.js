import { create } from 'zustand';
import { supabase } from '@/utils/supabase/client';

const useNewsStore = create((set, get) => ({
  /* ================= STATE ================= */
  news: [],
  singleNews: null,
  categories: [],
  loading: false,
  error: null,

  /* ================= ACTIONS ================= */

  /**
   * Mengambil URL gambar dari Supabase Storage.
   * PENTING: Pastikan nama Bucket di Supabase Storage Anda sesuai.
   * Jika path di database tersimpan sebagai 'article/nama_file.jpg',
   * kemungkinan bucket Anda bernama 'articles' atau 'public'.
   */
  getImageUrl: (path) => {
    // 1. Jika tidak ada path, kembalikan placeholder default
    if (!path) return "/hero-buleleng-3.jpg"; // Pastikan file ini ada di folder public project Anda

    // 2. Jika path sudah berupa URL lengkap (misal dari Google Drive atau web lain), kembalikan langsung
    if (path.toString().startsWith('http')) return path;

    // 3. Ambil dari Supabase Storage
    // GANTI 'articles' dengan nama bucket asli Anda di dashboard Supabase (misal: 'news_images' atau 'images')
    const { data } = supabase.storage
      .from('articles')
      .getPublicUrl(path);

    return data.publicUrl;
  },

  /**
   * Ambil daftar berita dari tabel 'articles' di Supabase.
   */
  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      // PERBAIKAN: Mengambil dari tabel 'articles', bukan 'posts'
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ news: data, loading: false });
    } catch (err) {
      console.error("Gagal mengambil berita:", err.message);
      set({ error: err.message, loading: false });
    }
  },

  /**
   * Ambil detail berita berdasarkan ID.
   */
  fetchNewsById: async (id) => {
    set({ loading: true, error: null, singleNews: null });
    try {
      // PERBAIKAN: Mengambil dari tabel 'articles', bukan 'posts'
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .eq('id', id)
        .single(); // Ambil satu data saja

      if (error) throw error;

      set({ singleNews: data, loading: false });
    } catch (err) {
      console.error("Gagal mengambil detail berita:", err.message);
      set({ error: err.message, loading: false });
    }
  },

  /**
   * Ambil daftar kategori dari tabel 'categories'.
   */
  fetchCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      set({ categories: data });
    } catch (err) {
      console.error("Error Kategori:", err.message);
    }
  },

  clearSingleNews: () => set({ singleNews: null, error: null })
}));

export default useNewsStore;