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

      {/* ================= SECTION: HERO SLIDER ================= */}
      <section className="relative overflow-hidden h-screen min-h-[600px] flex items-center pt-20">
        <div className="absolute inset-0">
          <Image src={heroImages[nextIndex].path} alt={heroImages[nextIndex].alt} fill className="object-cover absolute inset-0" priority={currentIndex === 0} />
          <Image
            src={heroImages[currentIndex].path}
            alt={heroImages[currentIndex].alt}
            fill
            className={`object-cover absolute inset-0 transition-opacity duration-1200 ${isFading ? "opacity-0" : "opacity-100"}`}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center text-white">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
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

      {/* ================= SECTION: STATISTIK ================= */}
      <section className="py-16 border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard value={3500} suffix="" label="Penduduk" isRibu={true} />
            <StatCard value={4} suffix="" label="Dusun" />
            <StatCard value={120} suffix="+" label="UMKM Aktif" />
            <StatCard value={24} suffix=" Jam" label="Layanan Online" />
          </div>
        </div>
      </section>

      {/* ================= SECTION: KABAR DESA ================= */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex justify-between items-end">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight uppercase">Kabar Desa Sangket</h2>
            <div className="w-24 h-1 bg-green-500 mb-4"></div>
            <p className="text-gray-500 text-lg">Inovasi dan berita terkini dari jantung desa.</p>
          </motion.div>
          <Link href="/berita" className="group text-green-700 font-bold flex items-center gap-2 hover:underline">
            LIHAT SEMUA <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </Link>
        </div>

        {/* CONTAINER MARQUEE - Fitur Pause dipindah ke sini */}
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

        {/* Perbaikan Selektor Hover CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-33.33% - 0.66rem)); } 
          }
          /* Hanya berhenti jika kursor berada di dalam area .group-marquee (area kartu) */
          .group-marquee:hover .marquee-track {
            animation-play-state: paused !important;
          }
        `}} />
      </section>
    </main>
  );
}

/* ================= KOMPONEN: STATCARD ================= */
function StatCard({ value, suffix, label, isRibu = false }) {
  const [displayValue, setDisplayValue] = useState(0);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} onViewportEnter={() => { animate(0, value, { duration: 2, onUpdate: (latest) => setDisplayValue(Math.round(latest)) }); }} className="p-4">
      <div className="text-4xl font-bold text-green-600 mb-2">
        {isRibu && displayValue >= 1000 ? (displayValue / 1000).toFixed(1) + " Ribu" : displayValue}{suffix}
      </div>
      <div className="text-gray-500 font-medium">{label}</div>
    </motion.div>
  );
}

/* ================= KOMPONEN: NEWSCARD ================= */
function NewsCard({ data }) {
  const getImageUrl = useNewsStore((state) => state.getImageUrl);

  return (
    <article className="relative h-[300px] w-full rounded-2xl overflow-hidden group/card shadow-xl bg-gray-900 text-white border border-gray-100">
      <Image 
        src={getImageUrl(data.image)} 
        alt={data.title} 
        fill 
        unoptimized={true} 
        className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col items-start">
        <Link 
          href={`/berita/${data.id}`}
          className="z-20 mb-3 flex items-center gap-2 text-white transition-all hover:text-green-400"
        >
          <span className="text-lg md:text-xl font-bold tracking-tight italic hover:underline underline-offset-4">
            → Baca Selengkapnya
          </span>
        </Link>
        <p className="text-xs font-semibold text-green-400 mb-3 uppercase tracking-widest opacity-90">
           {new Date(data.date || data.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h3 className="text-xl md:text-2xl font-extrabold leading-tight line-clamp-2 hover:text-green-400 transition-colors uppercase">
          <Link href={`/berita/${data.id}`}>
            {data.title}
          </Link>
        </h3>
      </div>
    </article>
  );
}