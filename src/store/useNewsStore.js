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
   * Mengambil URL gambar melalui rute khusus API Laravel.
   * Ditambahkan encodeURIComponent untuk menangani karakter spasi/khusus 
   * agar tidak menyebabkan 400 Bad Request.
   */
  getImageUrl: (path) => {
  if (!path) return "/hero-buleleng.jpg"; 
  if (path.toString().startsWith('http')) return path; 

  // Pastikan menggunakan forward slash (/) bukan backslash (\)
  const cleanPath = path.toString().replace(/\\/g, '/').replace(/^public\//, "");

  // HAPUS encodeURIComponent di sini agar tidak double encoding
  return `${API_BASE_URL}/image/${cleanPath}`;
},

  /**
   * Mengambil semua berita dengan dukungan filter pencarian dan kategori.
   */
  fetchNews: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const { search = "", category = "" } = params;
      const response = await fetch(
        `${API_BASE_URL}/articles?search=${search}&category=${category}`
      );
      
      if (!response.ok) throw new Error("Gagal mengambil daftar berita");
      
      const data = await response.json();
      
      // Mendukung response pagination Laravel (data.data) atau array langsung
      set({ news: data.data || data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  /**
   * Mengambil detail satu berita berdasarkan ID.
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
   * Mengambil daftar kategori dinamis dari database Laravel.
   */
  fetchCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) throw new Error("Gagal mengambil kategori");
      
      const data = await response.json();
      // Menyimpan daftar kategori (id, name) ke state
      set({ categories: data });
    } catch (err) {
      console.error("Error Kategori:", err.message);
    }
  },

  /**
   * Membersihkan data berita detail saat meninggalkan halaman.
   */
  clearSingleNews: () => set({ singleNews: null, error: null })
}));

export default useNewsStore;