'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; 
import useNewsStore from "@/store/useNewsStore"; // 1. Import Store

const heroImages = [
  { path: '/hero-buleleng.jpg', alt: 'Pemandangan Desa Sangket 1' },
  { path: '/desa-sangket.jpg', alt: 'Suasana Desa Sangket 2' },
  { path: '/hero-buleleng-2.webp', alt: 'Pemandangan Desa Sangket 3' },
  { path: '/hero-buleleng-3.jpg', alt: 'Pemandangan Desa Sangket 4' },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // 2. Ambil state dan aksi dari useNewsStore
  const { news, fetchNews, loading } = useNewsStore();

  useEffect(() => {
    // 3. Ambil data berita saat halaman dimuat
    fetchNews();

    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNews]);

  // 4. Logika untuk mengambil 3 berita TERBARU
  const latestNews = [...news]
    .sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date))
    .slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

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

  const currentImage = heroImages[currentIndex];
  const incomingImage = heroImages[nextIndex];

  return (
    <main className="bg-white">
      <Navbar scrolled={isScrolled} />

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden h-screen min-h-[600px] flex items-center pt-20">
        <div className="absolute inset-0">
          <Image src={incomingImage.path} alt={incomingImage.alt} fill className="object-cover absolute inset-0" priority={currentIndex === 0} />
          <Image
            src={currentImage.path}
            alt={currentImage.alt}
            fill
            className={`object-cover absolute inset-0 transition-opacity duration-1200 ${isFading ? "opacity-0" : "opacity-100"}`}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
              Website Resmi Desa Adat
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Membangun Desa <br />
              <span className="text-green-400">Sangket</span> yang Mandiri
            </h1>

            <p className="text-lg text-gray-200 mb-8">
              Pusat informasi pelayanan publik, transparansi anggaran,
              dan potensi desa berbasis digital.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/profil">
                <span className="inline-block px-8 py-3 bg-white border text-gray-700 rounded-lg font-medium hover:bg-green-600 hover:text-white shadow-lg cursor-pointer transition">
                  Profil Desa
                </span>
              </Link>

              <Link href="/layanan">
                <span className="inline-block px-8 py-3 bg-white border text-gray-700 rounded-lg font-medium hover:bg-green-600 hover:text-white shadow-lg cursor-pointer transition">
                  Layanan Online
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTIK ================= */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="3.5 Ribu" label="Penduduk" />
            <StatCard number="4" label="Dusun" />
            <StatCard number="120+" label="UMKM Aktif" />
            <StatCard number="24 Jam" label="Layanan Online" />
          </div>
        </div>
      </section>

      {/* ================= BERITA (DINAMIS) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Kabar Desa Sangket</h2>
              <p className="text-gray-500">Update terbaru kegiatan dan informasi desa.</p>
            </div>

            <Link href="/berita" className="hidden md:inline-block text-green-600 font-medium hover:underline">
              Lihat Semua Berita →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              // Skeleton atau Loading sederhana
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-2xl" />
              ))
            ) : latestNews.length > 0 ? (
              latestNews.map((item) => (
                <NewsCard key={item.id} data={item} />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400">Belum ada berita terbaru.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= KOMPONEN ================= */

function StatCard({ number, label }) {
  return (
    <div className="p-4">
      <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
      <div className="text-gray-500 font-medium">{label}</div>
    </div>
  );
}

function NewsCard({ data }) {
  const getImageUrl = useNewsStore((state) => state.getImageUrl);

  // Helper membersihkan HTML dan format tanggal
  const stripHtml = (html) => html ? html.replace(/<[^>]*>?/gm, '') : "";
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="border rounded-2xl overflow-hidden hover:shadow-xl transition bg-white flex flex-col h-full">
      <div className="h-48 relative">
        <Image 
          src={getImageUrl(data.image)} 
          alt={data.title} 
          fill 
          unoptimized={true} 
          className="object-cover" 
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-4 text-xs text-gray-500 mb-3">
          <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
            {data.category}
          </span>
          <span>{formatDate(data.date || data.created_at)}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-green-600 transition">
          <Link href={`/berita/${data.id}`}>{data.title}</Link>
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
          {data.desc || stripHtml(data.content)}
        </p>
        <Link href={`/berita/${data.id}`} className="mt-auto text-green-600 text-sm font-semibold hover:underline">
          Baca Selengkapnya →
        </Link>
      </div>
    </div>
  );
}