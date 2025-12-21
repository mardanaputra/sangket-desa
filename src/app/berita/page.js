"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import useNewsStore from "@/store/useNewsStore";
import useDebounce from "@/hooks/useDebounce"; // 1. Import hook debounce

export default function Berita() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // 2. Gunakan debounce untuk input pencarian (tunggu 500ms)
  const debouncedSearch = useDebounce(search, 500);

  const { news, categories, loading, error, fetchNews, fetchCategories } = useNewsStore();

  /* ================= EFFECTS ================= */
  
  // Ambil kategori hanya sekali saat mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 3. Trigger fetchNews hanya ketika debouncedSearch atau category berubah
  useEffect(() => {
    fetchNews({ search: debouncedSearch, category });
  }, [debouncedSearch, category, fetchNews]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= RENDER PENANGANAN STATUS ================= */
  // (Bagian loading dan error tetap sama seperti sebelumnya)
  if (loading) return (
    <>
      <Navbar scrolled={scrolled} />
      <main className="bg-gray-100 min-h-screen pt-40 text-center">
        <p className="text-xl text-green-700 font-semibold animate-pulse">Mencari berita...</p>
      </main>
    </>
  );

  return (
    <>
      <Navbar scrolled={scrolled} />

      <main className="bg-gray-100 min-h-screen pb-24">
        {/* HERO & FILTER SECTION */}
        <section className="relative pt-28 pb-24 px-6 text-center text-white">
          <Image src="/hero-buleleng-3.jpg" alt="Desa Sangket" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-green-900/50" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kabar Desa</h1>
            
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="md:col-span-1 px-4 py-3 rounded-md border border-gray-300 text-gray-700 focus:ring-2 focus:ring-green-600 outline-none"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id || cat} value={cat.name || cat}>{cat.name || cat}</option>
                  ))}
                </select>

                <div className="relative md:col-span-3">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Ketik untuk mencari berita..."
                    className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 focus:ring-2 focus:ring-green-600 outline-none"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2">🔍</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LIST BERITA */}
        <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 4. Gunakan 'news' langsung dari store, tidak perlu .filter() manual lagi */}
            {news && news.length > 0 ? (
              news.map((item) => (
                <NewsCard key={item.id} data={item} />
              ))
            ) : (
              <div className="md:col-span-3 text-center py-16 bg-white rounded-xl shadow-md">
                <p className="text-gray-500">Berita tidak ditemukan.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

/* ================= COMPONENT: CARD BERITA ================= */
function NewsCard({ data }) {
  const getImageUrl = useNewsStore((state) => state.getImageUrl);

  // 1. Fungsi untuk menghapus tag HTML (seperti <p>, <strong>) agar deskripsi bersih
  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, ''); 
  };

  // 2. Fungsi untuk merapikan format tanggal (Contoh: 27 Maret 2025)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <article className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition flex flex-col h-full">
      {/* BAGIAN GAMBAR */}
      <div className="relative h-52 w-full bg-gray-200">
        <Image 
          src={getImageUrl(data.image)}
          alt={data.title || "Gambar Berita"} 
          fill 
          unoptimized={true} // Tetap gunakan ini untuk bypass error 400 pada localhost
          className="object-cover"
        />
      </div>

      {/* BAGIAN KONTEN */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3 text-xs font-semibold">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-sm">
            {data.category}
          </span>
          {/* TANGGAL: Sudah diformat menjadi bahasa Indonesia */}
          <span className="text-gray-400">{formatDate(data.date || data.created_at)}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug hover:text-green-700 transition line-clamp-2">
          <Link href={`/berita/${data.id}`}>{data.title}</Link>
        </h3>

        {/* DESKRIPSI: Sudah bersih dari tag HTML dan dipotong agar rapi */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-5 flex-grow text-justify">
          {data.desc || stripHtml(data.content)?.substring(0, 120)}...
        </p>

        <Link
          href={`/berita/${data.id}`}
          className="text-green-700 font-semibold text-sm hover:underline mt-auto inline-block"
        >
          Baca Selengkapnya →
        </Link>
      </div>
    </article>
  );
}