"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import useNewsStore from "@/store/useNewsStore";
import useDebounce from "@/hooks/useDebounce";

function BeritaContent() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  // 1. UBAH JUMLAH KARTU PER HALAMAN JADI 10
  const postsPerPage = 5;

  const debouncedSearch = useDebounce(search, 500);
  const { news, categories, loading, fetchNews, fetchCategories } = useNewsStore();

  const safeCategories = useMemo(
    () => (Array.isArray(categories) ? categories : []),
    [categories]
  );

  useEffect(() => {
    const catFromUrl = searchParams.get("category");
    if (catFromUrl) setCategory(String(catFromUrl));
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
    fetchNews();
  }, [fetchCategories, fetchNews]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= FILTER ================= */
  const filteredNews = useMemo(() => {
    if (!Array.isArray(news)) return [];

    return news.filter((item) => {
      const matchesSearch = (item.title || "")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        category === "" ||
        String(item.categories?.id) === String(category);

      return matchesSearch && matchesCategory;
    });
  }, [news, debouncedSearch, category]);

  // Reset ke halaman 1 jika filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, category]);

  // 2. LOGIKA PAGINATION
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredNews.length / postsPerPage);

  // Fungsi ganti halaman dengan scroll effect
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll ke bagian atas list berita agar user tidak tetap di bawah
    const listSection = document.getElementById("news-list");
    if (listSection) {
      listSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main className="bg-gray-100 min-h-screen pb-24">
        {/* HERO */}
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
                  className="md:col-span-1 px-4 py-3 rounded-md border border-gray-300 text-gray-700 outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Semua Kategori</option>
                  {safeCategories.map((cat) => (
                    <option key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari berita desa..."
                  className="md:col-span-3 px-4 py-3 rounded-md border border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* LIST BERITA */}
        {/* Tambahkan ID untuk target scroll saat pindah halaman */}
        <section id="news-list" className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-sm">Loading...</div>
            ) : currentNews.length > 0 ? (
              <>
                {/* GRID CARD */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {currentNews.map((item) => (
                    <NewsCard key={item.id} data={item} />
                  ))}
                </div>

                {/* 3. KOMPONEN PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 pb-8">
                    {/* Tombol Previous */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      &laquo; Prev
                    </button>

                    {/* Angka Halaman */}
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-md border font-medium transition-colors ${currentPage === pageNum
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                            }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* Tombol Next */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next &raquo;
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500">Berita tidak ditemukan.</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </>
  );
}

export default function Berita() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading Halaman...</div>}>
      <BeritaContent />
    </Suspense>
  );
}

function NewsCard({ data }) {
  const getImageUrl = useNewsStore((state) => state.getImageUrl);
  const categoryDisplay = data.categories?.name || "Umum";

  return (
    <motion.article
      layout
      whileHover={{ y: -10 }}
      className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl transition-all flex flex-col h-full"
    >
      <Link href={`/berita/${data.id}`} className="flex flex-col h-full">
        <div className="relative h-52 w-full">
          <Image src={getImageUrl(data.image)} alt={data.title} fill unoptimized className="object-cover" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <span className="text-xs font-semibold text-green-700 mb-2">{categoryDisplay}</span>
          <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{data.title}</h3>
        </div>
      </Link>
    </motion.article>
  );
}