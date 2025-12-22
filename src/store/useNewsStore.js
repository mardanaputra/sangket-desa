import { create } from "zustand";

const useNewsStore = create((set, get) => ({
  /* ================= STATE ================= */
  news: [],
  singleNews: null,
  categories: [],
  loading: false,
  error: null,

  /* ================= HELPERS ================= */
  getImageUrl: (path) => {
    if (!path) return "/hero-buleleng.jpg";
    if (String(path).startsWith("http")) return String(path);

    const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const BUCKET_NAME = "news_images";

    if (!PROJECT_URL) return "/hero-buleleng.jpg";

    return `${PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`;
  },

  /* ================= ACTIONS ================= */

  // Ambil daftar berita
  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/v1/articles", { cache: "no-store" });

      if (!res.ok) throw new Error(`Gagal mengambil berita: ${res.status} ${res.statusText}`);

      const data = await res.json();

      set({
        news: Array.isArray(data) ? data : [],
        loading: false,
      });
    } catch (err) {
      set({
        news: [],
        error: err?.message || "Terjadi kesalahan saat mengambil berita",
        loading: false,
      });
    }
  },

  // Ambil detail berita by id
  fetchNewsById: async (id) => {
    if (!id) return;

    set({ loading: true, error: null, singleNews: null });
    try {
      // rekomendasi: buat route detail -> /api/v1/articles/[id]
      const res = await fetch(`/api/v1/articles/${id}`, { cache: "no-store" });

      if (!res.ok) {
        throw new Error(`Gagal mengambil detail berita: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      set({
        singleNews: data || null,
        loading: false,
      });
    } catch (err) {
      set({
        singleNews: null,
        error: err?.message || "Terjadi kesalahan saat mengambil detail berita",
        loading: false,
      });
    }
  },

  // Ambil kategori
  fetchCategories: async () => {
    try {
      const res = await fetch("/api/v1/categories", { cache: "no-store" });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Gagal load kategori: ${res.status} ${res.statusText} ${txt}`);
      }

      const json = await res.json();

      // ✅ support banyak bentuk response
      const cats =
        Array.isArray(json) ? json :
          Array.isArray(json?.data) ? json.data :
            Array.isArray(json?.categories) ? json.categories :
              [];

      set({ categories: cats });

    } catch (err) {
      console.error("Error Kategori:", err);
      set({ categories: [] });
    }
  },


  clearSingleNews: () => set({ singleNews: null, error: null }),
}));

export default useNewsStore;
