"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
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

  /* ================= ANIMATION VARIANTS ================= */
  
  // Varian untuk animasi teks masuk
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // Varian untuk container list (Stagger children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Memberikan jeda antar kartu saat muncul
      }
    }
  };

  return (
    <>
      <Navbar scrolled={scrolled} />

      <main className="bg-gray-100 min-h-screen pb-24">
        {/* ================= HERO & FILTER SECTION ================= */}
        <section className="relative pt-28 pb-24 px-6 text-center text-white overflow-hidden">
          <Image src="/hero-buleleng-3.jpg" alt="Desa Sangket" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-green-900/50" />

          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
              Kabar Desa
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="bg-white p-4 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="md:col-span-1 px-4 py-3 rounded-md border border-gray-300 text-gray-700 outline-none focus:ring-2 focus:ring-green-600 transition-all"
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
                    placeholder="Cari berita desa..."
                    className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 outline-none focus:ring-2 focus:ring-green-600 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ================= LIST BERITA DENGAN ANIMASI ================= */}
        <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:col-span-3 text-center py-20 bg-white/80 rounded-xl shadow-sm"
              >
                 <p className="text-green-700 font-semibold animate-pulse">Memperbarui daftar berita...</p>
              </motion.div>
            ) : news && news.length > 0 ? (
              <motion.div 
                key="list"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {news.map((item) => (
                  <NewsCard key={item.id} data={item} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="md:col-span-3 text-center py-16 bg-white rounded-xl shadow-md"
              >
                <p className="text-gray-500">Berita tidak ditemukan.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>
    </>
  );
}

/* ================= COMPONENT: CARD BERITA (MOTION ARTICLE) ================= */
function NewsCard({ data }) {
  const getImageUrl = useNewsStore((state) => state.getImageUrl);
  const categories = useNewsStore((state) => state.categories);

  const stripHtml = (html) => html ? html.replace(/<[^>]*>?/gm, '') : "";
  
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const categoryData = categories.find(cat => 
    String(cat.id) === String(data.category_id) || 
    String(cat.id) === String(data.category)
  );

  const categoryDisplay = categoryData?.name || data.category_name || data.category || "Umum";

  // Varian untuk item individual masuk
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.article 
      variants={itemVariants} // Terhubung dengan stagger di container
      whileHover={{ y: -10 }} // Efek angkat saat hover
      className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-2xl transition-all flex flex-col h-full group"
    >
      <Link href={`/berita/${data.id}`} className="flex flex-col h-full">
        
        <div className="relative h-52 w-full bg-gray-200 overflow-hidden">
          <Image 
            src={getImageUrl(data.image)}
            alt={data.title} 
            fill 
            unoptimized={true} 
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3 text-xs font-semibold">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-sm uppercase tracking-wider">
              {categoryDisplay} 
            </span>
            <span className="text-gray-400">{formatDate(data.date || data.created_at)}</span>
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
            {data.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-3 mb-5 flex-grow text-justify">
            {data.desc || stripHtml(data.content)?.substring(0, 120)}...
          </p>

          <span className="text-green-700 font-semibold text-sm group-hover:underline mt-auto">
            Baca Selengkapnya →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}