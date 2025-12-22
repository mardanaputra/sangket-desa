"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import useNewsStore from "@/store/useNewsStore";
import useDebounce from "@/hooks/useDebounce";

export default function Berita() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Ref untuk scroll otomatis saat paginasi berubah
  const contentRef = useRef(null);

  const postsPerPage = 6;
  const debouncedSearch = useDebounce(search, 500);

  // Pastikan store Anda mengambil data dari tabel 'articles'
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

  /* ================= LOGIKA FILTER & MEMO ================= */
  const filteredNews = useMemo(() => {
    if (!news) return [];

    return news.filter((item) => {
      // Null safety untuk title
      const title = item.title ? item.title.toLowerCase() : "";
      const query = debouncedSearch.toLowerCase();
      const matchesSearch = title.includes(query);

      // Konversi BigInt/Number ke String untuk perbandingan aman
      const itemCatId = item.category_id ? String(item.category_id) : "null";
      const filterCatId = String(category);

      const matchesCategory = category === "" || itemCatId === filterCatId;

      return matchesSearch && matchesCategory;
    });
  }, [news, debouncedSearch, category]);

  // Reset ke halaman 1 jika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  /* ================= LOGIKA PAGINATION ================= */
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredNews.length / postsPerPage);

  // Fungsi scroll smooth ke bagian konten
  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Timeout kecil agar render selesai baru scroll
    setTimeout(scrollToContent, 100);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main className="bg-gray-50 min-h-screen pb-24">

        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 px-6 text-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/hero-buleleng-3.jpg"
              alt="Desa Sangket"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 to-green-800/60" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto mt-10">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-8 drop-shadow-md"
            >
              Kabar Desa Sangket
            </motion.h1>

            {/* FILTER BOX */}
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 shadow-xl">
              <div className="bg-white p-4 rounded-lg shadow-inner grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1 relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 appearance-none outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent cursor-pointer transition-all bg-white"
                  >
                    <option value="">Semua Topik</option>
                    {categories.map((cat) => (
                      <option key={cat.id ? String(cat.id) : Math.random()} value={String(cat.id)}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▼</span>
                </div>

                <div className="relative md:col-span-3">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari berita atau pengumuman..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-green-600 transition-all placeholder:text-gray-400"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEWS LIST SECTION */}
        <section ref={contentRef} className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" className="text-center py-24 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mb-4"></div>
                <p className="text-gray-500 font-medium">Memuat data berita...</p>
              </motion.div>
            ) : currentNews.length > 0 ? (
              <>
                <motion.div
                  key="list"
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {currentNews.map((item) => (
                    // Menggunakan String(id) agar aman jika database mengembalikan BigInt
                    <NewsCard key={String(item.id)} data={item} />
                  ))}
                </motion.div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-16 gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-green-700 border border-green-600 hover:bg-green-50 shadow-sm"
                        }`}
                    >
                      ← Prev
                    </button>

                    <div className="hidden sm:flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => handlePageChange(i + 1)}
                          className={`w-10 h-10 rounded-lg font-bold transition-all flex items-center justify-center ${currentPage === i + 1
                              ? "bg-green-700 text-white shadow-lg scale-105"
                              : "bg-white text-gray-600 border border-gray-200 hover:border-green-600"
                            }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white text-green-700 border border-green-600 hover:bg-green-50 shadow-sm"
                        }`}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <motion.div key="empty" className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ada berita ditemukan</h3>
                <p className="text-gray-500">Coba gunakan kata kunci pencarian yang lain.</p>
                <button
                  onClick={() => { setSearch(""); setCategory(""); }}
                  className="mt-6 text-green-600 hover:underline font-medium"
                >
                  Reset Filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </>
  );
}

/* ================= COMPONENT KARTU BERITA ================= */
function NewsCard({ data }) {
  const getImageUrl = useNewsStore((state) => state.getImageUrl);

  // Ambil nama kategori (Handle struktur Supabase: categories: { name: ... } atau array)
  let categoryName = "Umum";
  if (data.categories) {
    if (Array.isArray(data.categories)) {
      categoryName = data.categories[0]?.name || "Umum";
    } else {
      categoryName = data.categories.name || "Umum";
    }
  }

  // Format Tanggal Indonesia
  const formattedDate = data.created_at
    ? new Date(data.created_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "";

  // Bersihkan konten HTML untuk preview
  const previewContent = data.desc ||
    (data.content ? data.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + "..." : "Simak selengkapnya...");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 flex flex-col h-full group"
    >
      <Link href={`/berita/${String(data.id)}`} className="flex flex-col h-full">

        {/* GAMBAR */}
        <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
          <Image
            src={getImageUrl(data.image)}
            alt={data.title || "Berita Desa"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            // Gunakan unoptimized jika domain belum didaftarkan di next.config.js
            unoptimized
          />
          {/* Tanggal Badge */}
          {formattedDate && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-800 shadow-sm">
              📅 {formattedDate}
            </div>
          )}
        </div>

        {/* KONTEN */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-50 text-green-700 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border border-green-100">
              {categoryName}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight group-hover:text-green-700 transition-colors line-clamp-2">
            {data.title}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-3 mb-5 flex-grow leading-relaxed text-justify">
            {previewContent}
          </p>

          <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
            <span className="text-green-600 text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Baca Selengkapnya
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}