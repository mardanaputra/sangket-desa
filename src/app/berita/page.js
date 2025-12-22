"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import useNewsStore from "@/store/useNewsStore";
import useDebounce from "@/hooks/useDebounce";

export default function Berita() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { news, categories, loading, fetchNews, fetchCategories } = useNewsStore();

  /* ================= EFFECTS ================= */
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchNews({ search: debouncedSearch, category });
  }, [debouncedSearch, category, fetchNews]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= RENDER ================= */
  return (
    <>
      <Navbar scrolled={scrolled} />

      <main className="bg-gray-100 min-h-screen pb-24">
        {/* HERO & FILTER SECTION: 
            Dibiarkan tetap render (tidak di-unmount) agar fokus input pencarian tidak hilang saat loading 
        */}
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

        {/* LIST BERITA: Indikator loading hanya diletakkan di sini */}
        <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading lokal agar halaman utama (termasuk input search) tidak hilang
              <div className="md:col-span-3 text-center py-20 bg-white/80 rounded-xl shadow-sm">
                 <p className="text-green-700 font-semibold animate-pulse">Memperbarui daftar berita...</p>
              </div>
            ) : news && news.length > 0 ? (
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

  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, ''); 
  };

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
      <div className="relative h-52 w-full bg-gray-200">
        <Image 
          src={getImageUrl(data.image)}
          alt={data.title || "Gambar Berita"} 
          fill 
          unoptimized={true} 
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3 text-xs font-semibold">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-sm">
            {data.category}
          </span>
          <span className="text-gray-400">{formatDate(data.date || data.created_at)}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug hover:text-green-700 transition line-clamp-2">
          <Link href={`/berita/${data.id}`}>{data.title}</Link>
        </h3>

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