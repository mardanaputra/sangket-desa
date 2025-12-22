import { create } from "zustand";

const useNewsStore = create((set) => ({
  news: [],
  singleNews: null,
  categories: [],
  loading: false,
  error: null,

  getImageUrl: (path) => {
    if (!path) return "/hero-buleleng.jpg";
    if (String(path).startsWith("http")) return String(path);

    const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const BUCKET_NAME = "news_images";

    // ✅ kalau env belum ada saat build, jangan bikin URL aneh
    if (!PROJECT_URL) return "/hero-buleleng.jpg";

    return `${PROJECT_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`;
  },

  // ✅ INI YANG TADI KAMU SALAH: namanya harus fetchNews
  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/v1/articles", { cache: "no-store" });
      if (!res.ok) throw new Error(`Gagal mengambil berita: ${res.statusText}`);
      const json = await res.json();

      const arr = Array.isArray(json) ? json : Array.isArray(json?.data) ? json.data : [];
      set({ news: arr, loading: false });
    } catch (err) {
      set({ news: [], error: err?.message || "Gagal mengambil berita", loading: false });
    }
  },

  fetchNewsById: async (id) => {
    set({ loading: true, error: null, singleNews: null });
    try {
      const res = await fetch(`/api/v1/articles/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Gagal mengambil detail: ${res.statusText}`);
      const json = await res.json();

      // support {data: {...}} atau langsung object
      const obj = json?.data ?? json;
      set({ singleNews: obj || null, loading: false });
    } catch (err) {
      set({ singleNews: null, error: err?.message || "Gagal mengambil detail", loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await fetch("/api/v1/categories", { cache: "no-store" });
      if (!res.ok) throw new Error(`Gagal load kategori: ${res.statusText}`);
      const json = await res.json();

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
