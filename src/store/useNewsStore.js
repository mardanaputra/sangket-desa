import { create } from 'zustand';
import { supabase } from '@/utils/supabase/client'; // Pastikan path helper benar

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
   */
  getImageUrl: (path) => {
    if (!path) return "/hero-buleleng.jpg";
    if (path.toString().startsWith('http')) return path;

    // Ganti 'news_images' dengan nama BUCKET di Supabase Storage Anda
    const { data } = supabase.storage
      .from('news_images')
      .getPublicUrl(path);

    return data.publicUrl;
  },

  /**
   * Ambil daftar berita dari tabel 'posts' di Supabase.
   */
  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      // Ambil data posts dan join dengan tabel categories
      const { data, error } = await supabase
        .from('posts')
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
      set({ error: err.message, loading: false });
    }
  },

  /**
   * Ambil detail berita berdasarkan ID.
   */
  fetchNewsById: async (id) => {
    set({ loading: true, error: null, singleNews: null });
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          categories (
            name
          )
        `)
        .eq('id', id)
        .single(); // Ambil satu data saja

      if (error) throw error;

      set({ singleNews: data, loading: false });
    } catch (err) {
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