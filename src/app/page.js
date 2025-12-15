'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; 

const heroImages = [
  { path: '/hero-buleleng.jpg', alt: 'Pemandangan Desa Sangket 1' },
  { path: '/desa-sangket.jpg', alt: 'Suasana Desa Sangket 2' },
  { path: '/hero-buleleng-2.webp', alt: 'Pemandangan Desa Sangket 3' },
  { path: '/hero-buleleng-3.jpg', alt: 'Pemandangan Desa Sangket 4' },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                <span className="inline-block px-8 py-3 bg-white border text-gray-700 rounded-lg font-medium hover:bg-green-600 hover:text-white shadow-lg cursor-pointer">
                  Profil Desa
                </span>
              </Link>

              <Link href="/layanan">
                <span className="inline-block px-8 py-3 bg-white border text-gray-700 rounded-lg font-medium hover:bg-green-600 hover:text-white shadow-lg cursor-pointer">
                  Layanan Online
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION BARU (KOSONG) ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            SECTION KOSONG
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Bagian ini sengaja dikosongkan dan dapat diisi sesuai kebutuhan tim.
            Contoh penggunaan: sambutan kepala desa, pengumuman penting,
            banner program desa, atau konten informasi lainnya.
          </p>
          <p className="text-sm text-gray-400 mt-4 italic">
            (Silakan modifikasi section ini sesuai kebutuhan)
          </p>
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

      {/* ================= BERITA ================= */}
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
            <NewsCard category="Pemerintahan" date="08 Des 2025" title="Musyawarah Perencanaan Pembangunan Desa Tahun 2025" desc="Pemerintah desa mengundang seluruh elemen masyarakat..." imageSrc="/desa-sangket.jpg" />
            <NewsCard category="Kesehatan" date="06 Des 2025" title="Jadwal Posyandu Balita & Lansia Bulan Ini" desc="Berikut jadwal lengkap kegiatan Posyandu..." imageSrc="/desa-sangket.jpg" />
            <NewsCard category="Ekonomi" date="01 Des 2025" title="Pelatihan Digital Marketing UMKM Desa" desc="Meningkatkan daya saing produk lokal..." imageSrc="/desa-sangket.jpg" />
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

function NewsCard({ category, date, title, desc, imageSrc }) {
  return (
    <div className="border rounded-2xl overflow-hidden hover:shadow-xl transition bg-white">
      <div className="h-48 relative">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex gap-4 text-xs text-gray-500 mb-3">
          <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">{category}</span>
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-500 text-sm line-clamp-3">{desc}</p>
      </div>
    </div>
  );
}
