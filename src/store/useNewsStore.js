import { create } from 'zustand';

// Mengambil URL API dari environment variable (Next.js)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const useNewsStore = create((set) => ({
  /* ================= STATE ================= */
  news: [],
  singleNews: null,
  categories: [],
  loading: false,
  error: null,

  /* ================= ACTIONS ================= */

  /**
   * Fungsi Helper untuk memproses URL gambar.
   * Membersihkan path agar kompatibel dengan Route API Laravel.
   */
  getImageUrl: (path) => {
    // 1. Jika path kosong, gunakan gambar default
    if (!path) return "/hero-buleleng.jpg"; 
    
    // 2. Jika path sudah berupa URL lengkap, langsung kembalikan
    if (path.toString().startsWith('http')) return path; 
    
    /**
     * 3. Pembersihan Path:
     * - Mengubah backslash (\) menjadi forward slash (/)
     * - Menghapus awalan 'public/' jika tersimpan di database
     */
    const cleanPath = path.toString()
      .replace(/\\/g, '/')
      .replace(/^public\//, "");

    /**
     * 4. Mengarahkan ke endpoint khusus Laravel:
     * Browser akan menangani encoding spasi secara otomatis.
     */
    return `${API_BASE_URL}/image/${cleanPath}`;
  },

  /**
   * Ambil daftar berita dengan filter pencarian & kategori.
   */
  fetchNews: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const { search = "", category = "" } = params;
      
      // Menggunakan URLSearchParams agar query string lebih aman
      const query = new URLSearchParams({ search, category }).toString();
      const response = await fetch(`${API_BASE_URL}/articles?${query}`);
      
      if (!response.ok) throw new Error("Gagal mengambil daftar berita");
      
      const data = await response.json();
      
      // Mendukung response pagination Laravel (data.data) atau array langsung
      set({ news: data.data || data, loading: false });
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
      const response = await fetch(`${API_BASE_URL}/articles/${id}`);
      if (!response.ok) throw new Error("Berita tidak ditemukan");

      const data = await response.json();
      set({ singleNews: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  /**
   * Ambil daftar kategori dinamis dari Laravel.
   */
  fetchCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) throw new Error("Gagal mengambil kategori");
      
      const data = await response.json();
      set({ categories: data });
    } catch (err) {
      console.error("Error Kategori:", err.message);
    }
  },

  /**
   * Membersihkan data detail saat pindah halaman.
   */
  clearSingleNews: () => set({ singleNews: null, error: null })
}));

export default useNewsStore;