// File: src/app/berita/page.js

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

// Definisikan URL API dari environment variable (.env.local)
// Pastikan NEXT_PUBLIC_API_URL disetel (misalnya: http://localhost:8000/api)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Berita() {
  /* ================= STATE ================= */
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // State baru untuk menyimpan data berita yang diambil dari API
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= DUMMY BACKEND (Kategori) ================= */
  const categories = [
    "Pemerintahan",
    "Kesehatan",
    "Ekonomi",
    "Pembangunan",
    "Sosial",
    "Adat",
  ];

  /* ================= API FETCHING ================= */
  useEffect(() => {
    const fetchNews = async () => {
      // Cek apakah API_BASE_URL sudah didefinisikan
      if (!API_BASE_URL) {
        console.error("NEXT_PUBLIC_API_URL tidak didefinisikan!");
        setError("API URL tidak ditemukan. Pastikan .env.local sudah disetel dan server di-restart.");
        setLoading(false);
        return;
      }

      try {
        // MENGGUNAKAN ENDPOINT LARAVEL: /articles
        const response = await fetch(`${API_BASE_URL}/articles`); 
        
        if (!response.ok) {
          // Status error selain 404 (misal: 500 Server Error)
          throw new Error(`Gagal mengambil data. Status: ${response.status}`);
        }

        const data = await response.json();
        setNewsItems(data); // Set state newsItems dengan data dari API
        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data berita:", err);
        // Menampilkan error dari CORS/Network atau status 500
        setError(err.message); 
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Array dependensi kosong: agar fetchNews hanya berjalan sekali saat komponen dimuat

  /* ================= SCROLL NAVBAR ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= FILTER ================= */
  // Filter akan otomatis bekerja pada data newsItems yang sudah di-fetch
  const filteredNews = newsItems.filter((item) => {
    const matchCategory = category ? item.category === category : true;
    // Pastikan item memiliki title dan desc, atau tambahkan fallback
    const matchSearch =
      (item.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (item.desc?.toLowerCase() || "").includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });
  
  // ================= RENDER PENANGANAN STATUS ================= 
  if (loading) {
    return (
      <>
        <Navbar scrolled={scrolled} />
        <main className="bg-gray-100 min-h-screen pt-40 pb-24 text-center">
          <p className="text-xl text-gray-700">Memuat berita...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar scrolled={scrolled} />
        <main className="bg-gray-100 min-h-screen pt-40 pb-24 text-center">
          <p className="text-xl text-red-600">Terjadi kesalahan saat memuat data: {error}</p>
          <p className="text-gray-500">Cek server Laravel Anda dan konfigurasi CORS.</p>
        </main>
      </>
    );
  }
  
  // ================= RENDER UTAMA ================= 
  return (
    <>
      <Navbar scrolled={scrolled} />

      <main className="bg-gray-100 min-h-screen pb-24">
        {/* ================= HERO ================= */}
        <section className="relative pt-28 pb-24 px-6 text-center text-white">
          <Image
            src="/hero-buleleng-3.jpg"
            alt="Desa Sangket Buleleng"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-green-900/50" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
              Kabar Desa
            </h1>
            <p className="text-green-100 text-lg mb-10">
              Informasi resmi Pemerintah Desa Sangket
            </p>

            {/* ================= SEARCH & FILTER ================= */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {/* FILTER KATEGORI */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="md:col-span-1 px-4 py-3 rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">Semua Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* SEARCH INPUT */}
                <div className="relative md:col-span-3">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari berita atau informasi..."
                    className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    🔍
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LIST BERITA ================= */}
        <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <NewsCard key={item.id} data={item} />
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 text-center py-10 bg-white rounded-xl shadow-md">
                <p className="text-gray-500">
                  {/* Tampilkan pesan jika tidak ada berita dari API atau hasil filter kosong */}
                  {newsItems.length === 0 ? "Belum ada berita yang tersedia dari API." : "Tidak ditemukan berita untuk kriteria pencarian ini."}
                </p>
              </div>
            )}
          </div>

          {/* ================= PAGINATION (Dummy) ================= */}
          <div className="mt-14 flex justify-center gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
              Sebelumnya
            </button>
            <button className="px-4 py-2 bg-green-700 text-white rounded-md">
              1
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
              2
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
              Selanjutnya
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

/* ================= CARD BERITA (MODIFIED FOR IMAGE) ================= */
function NewsCard({ data }) {
  // Asumsi: data dari Laravel memiliki field 'image_url'
  const imageUrl = data.image_url || "/hero-buleleng.jpg"; 

  return (
    <article className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition flex flex-col">
      {/* BAGIAN GAMBAR - Menggunakan Next/Image */}
      <div className="relative h-52 w-full bg-gray-200">
        <Image 
          src={imageUrl} 
          alt={data.title || "Gambar Berita"} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3 text-xs font-semibold">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-sm">
            {data.category}
          </span>
          <span className="text-gray-400">{data.date}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-3 leading-snug hover:text-green-700 transition">
          <Link href={`/berita/${data.id}`}>{data.title}</Link>
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-5 flex-grow">
          {data.desc}
        </p>

        <Link
          href={`/berita/${data.id}`}
          className="text-green-700 font-semibold text-sm hover:underline mt-auto"
        >
          Baca Selengkapnya →
        </Link>
      </div>
    </article>
  );
}