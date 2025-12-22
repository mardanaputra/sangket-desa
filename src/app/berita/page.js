"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import useNewsStore from "@/store/useNewsStore";
import useDebounce from "@/hooks/useDebounce";

export default function Berita() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const debouncedSearch = useDebounce(search, 500);
  const { news, categories, loading, fetchNews, fetchCategories } = useNewsStore();

  useEffect(() => {
    fetchCategories();
    fetchNews();
  }, [fetchCategories, fetchNews]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= FIX LOGIKA FILTER ================= */
  const filteredNews = useMemo(() => {
    if (!news) return [];

    return news.filter((item) => {
      // Pastikan title tidak null
      const matchesSearch = (item.title || "").toLowerCase().includes(debouncedSearch.toLowerCase());

      // Supabase biasanya mengembalikan ID sebagai string atau number. 
      // Kita pastikan perbandingan tipe datanya konsisten.
      const matchesCategory = category === "" || String(item.category_id) === String(category);

      return matchesSearch && matchesCategory;
    });
  }, [news, debouncedSearch, category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredNews.length / postsPerPage);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main className="bg-gray-100 min-h-screen pb-24">
        {/* Hero Section tetap sama */}
        <section className="relative pt-28 pb-24 px-6 text-center text-white overflow-hidden">
          <Image src="/hero-buleleng-3.jpg" alt="Desa Sangket" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-green-900/50" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
              Kabar Desa
            </motion.h1>

            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="md:col-span-1 px-4 py-3 rounded-md border border-gray-300 text-gray-700 outline-none focus:ring-2 focus:ring-green-600 transition-all cursor-pointer"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <div className="relative md:col-span-3">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari berita desa..."
                    className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-green-600 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2">🔍</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" className="text-center py-20 bg-white/80 rounded-xl shadow-sm">
                <p className="text-green-700 font-semibold animate-pulse">Memperbarui daftar berita...</p>
              </motion.div>
            ) : currentNews.length > 0 ? (
              <>
                <motion.div key="list" initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentNews.map((item) => (
                    <NewsCard key={item.id} data={item} />
                  ))}
                </motion.div>

                {/* Pagination UI tetap sama */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-16 gap-3">
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-all border ${currentPage === 1
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : "bg-white text-green-700 border-gray-200 hover:border-green-600 active:scale-95"
                        }`}
                    >
                      ← Sebelumnya
                    </button>
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 rounded-lg font-bold transition-all border ${currentPage === i + 1
                              ? "bg-green-700 text-white border-green-700 shadow-md scale-105"
                              : "bg-white text-gray-600 border-gray-200 hover:border-green-600"
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition-all border ${currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : "bg-white text-green-700 border-gray-200 hover:border-green-600 active:scale-95"
                        }`}
                    >
                      Berikutnya →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div key="empty" className="text-center py-16 bg-white rounded-xl shadow-md">
                <p className="text-gray-500">Berita tidak ditemukan.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </>
  );
}

/* ================= FIX NEWSCARD UNTUK SUPABASE ================= */
function NewsCard({ data }) {
  const getImageUrl = useNewsStore((state) => state.getImageUrl);

  // Karena kita menggunakan .select('*, categories(name)') di Supabase,
  // Nama kategori biasanya ada di data.categories.name
  const categoryDisplay = data.categories?.name || "Umum";

  return (
    <motion.article
      layout
      whileHover={{ y: -10 }}
      className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl transition-all flex flex-col h-full group"
    >
      <Link href={`/berita/${data.id}`} className="flex flex-col h-full">
        <div className="relative h-52 w-full bg-gray-200 overflow-hidden">
          {/* Unoptimized ditambahkan karena domain Supabase berbeda dengan domain web Anda */}
          <Image
            src={getImageUrl(data.image)}
            alt={data.title || "Berita"}
            fill
            unoptimized
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3 text-xs font-semibold">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-sm uppercase tracking-wider">
              {categoryDisplay}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
            {data.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-5 flex-grow text-justify">
            {/* Bersihkan tag HTML jika konten diambil dari text editor */}
            {data.desc || (data.content ? data.content.replace(/<[^>]*>?/gm, '').substring(0, 120) : "Tidak ada deskripsi...")}
          </p>
          <span className="text-green-700 font-semibold text-sm group-hover:underline mt-auto">Baca Selengkapnya →</span>
        </div>
      </Link>
    </motion.article>
  );
}