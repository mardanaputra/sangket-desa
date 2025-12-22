'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, animate } from "framer-motion";
import Navbar from "../components/Navbar";
import useNewsStore from "@/store/useNewsStore";

// =========================================================================
// ASSET HERO
// =========================================================================
const heroImages = [
  { path: '/hero-buleleng.jpg', alt: 'Pemandangan Desa Sangket 1' },
  { path: '/desa-sangket.jpg', alt: 'Suasana Desa Sangket 2' },
  { path: '/hero-buleleng-2.webp', alt: 'Pemandangan Desa Sangket 3' },
  { path: '/hero-buleleng-3.jpg', alt: 'Pemandangan Desa Sangket 4' },
];

export default function Home() {
  /* ================= STATE & STORE ================= */
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { news, fetchNews, loading, fetchCategories } = useNewsStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

  /* ================= EFFECTS ================= */
  useEffect(() => {
    setMounted(true);
    fetchCategories();
    fetchNews();

    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNews, fetchCategories]);

  // Logic Slider Hero
  useEffect(() => {
    const totalImages = heroImages.length;
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
        setNextIndex((prev) => (prev + 1) % totalImages);
        setIsFading(false);
      }, 1200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const marqueeNews = news.length > 0 ? [...news, ...news, ...news] : [];

  return (
    <main className="bg-white overflow-hidden">
      <Navbar scrolled={isScrolled} />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden h-screen min-h-[600px] flex items-center pt-20">
        <div className="absolute inset-0">
          <Image
            src={heroImages[nextIndex].path}
            alt={heroImages[nextIndex].alt}
            fill
            className="object-cover absolute inset-0"
            priority={currentIndex === 0}
          />
          <Image
            src={heroImages[currentIndex].path}
            alt={heroImages[currentIndex].alt}
            fill
            className={`object-cover absolute inset-0 transition-opacity duration-1200 ${isFading ? "opacity-0" : "opacity-100"
              }`}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center text-white">
          <motion.div initial="hidden" animate="visible">
            <motion.span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
              Website Resmi Desa Adat
            </motion.span>
            <motion.h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Membangun Desa <br />
              <span className="text-green-400">Sangket</span> yang Mandiri
            </motion.h1>
            <motion.p className="text-lg text-gray-200 mb-8 max-w-2xl">
              Pusat informasi pelayanan publik, transparansi anggaran, dan potensi desa berbasis digital.
            </motion.p>
            <div className="flex flex-wrap gap-4 text-gray-800">
              <Link href="/profil">
                <span className="inline-block px-8 py-3 bg-white border rounded-lg font-medium hover:bg-green-600 hover:text-white shadow-lg cursor-pointer transition-all">
                  Profil Desa
                </span>
              </Link>
              <Link href="/layanan">
                <span className="inline-block px-8 py-3 bg-white border rounded-lg font-medium hover:bg-green-600 hover:text-white shadow-lg cursor-pointer transition-all">
                  Layanan Online
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= KABAR DESA ================= */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3 uppercase">
              Kabar Desa Sangket
            </h2>
            <div className="w-24 h-1 bg-green-500 mb-4"></div>
            <p className="text-gray-500 text-lg">
              Inovasi dan berita terkini dari jantung desa.
            </p>
          </div>
          <Link href="/berita" className="group text-green-700 font-bold flex items-center gap-2 hover:underline">
            LIHAT SEMUA <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>

        <div className="relative flex overflow-hidden group-marquee">
          <div
            className="marquee-track px-4"
            style={{
              display: 'flex',
              gap: '2rem',
              width: 'max-content',
              animation: mounted ? 'marquee 50s linear infinite' : 'none',
            }}
          >
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="w-[420px] h-[300px] bg-gray-100 animate-pulse rounded-2xl" />
              ))
            ) : marqueeNews.length > 0 ? (
              marqueeNews.map((item, index) => (
                <div key={`${item.id}-${index}`} className="w-[420px] flex-shrink-0">
                  <NewsCard data={item} />
                </div>
              ))
            ) : (
              <p className="text-gray-400 p-10">Belum ada berita terbaru.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= NEWSCARD ================= */
function NewsCard({ data }) {
  const getImageUrl = useNewsStore((state) => state.getImageUrl);

  return (
    <article className="relative h-[300px] w-full rounded-2xl overflow-hidden group/card shadow-xl bg-gray-900 text-white border border-gray-100">
      <Image
        src={getImageUrl(data.image)}
        alt={data.title}
        fill
        unoptimized
        className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full z-10">
        <Link href={`/berita/${data.id}`} className="text-lg font-bold hover:text-green-400">
          → Baca Selengkapnya
        </Link>
        <h3 className="text-xl md:text-2xl font-extrabold mt-3 line-clamp-2 uppercase">
          {data.title}
        </h3>
      </div>
    </article>
  );
}
