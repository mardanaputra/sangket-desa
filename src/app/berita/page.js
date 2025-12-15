"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Berita() {
  /* ================= STATE ================= */
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  /* ================= DUMMY BACKEND ================= */
  const categories = [
    "Pemerintahan",
    "Kesehatan",
    "Ekonomi",
    "Pembangunan",
    "Sosial",
    "Adat",
  ];

  const newsItems = [
    {
      id: 1,
      category: "Pemerintahan",
      date: "08 Des 2025",
      title: "Musyawarah Perencanaan Pembangunan Desa 2025",
      desc: "Pemdes mengundang seluruh elemen masyarakat untuk berpartisipasi dalam merancang masa depan desa...",
    },
    {
      id: 2,
      category: "Kesehatan",
      date: "06 Des 2025",
      title: "Jadwal Posyandu Balita & Lansia Bulan Desember",
      desc: "Cek jadwal lengkap kegiatan Posyandu di setiap dusun. Jangan lupa bawa buku KIA...",
    },
    {
      id: 3,
      category: "Ekonomi",
      date: "01 Des 2025",
      title: "Pelatihan Digital Marketing untuk UMKM Desa",
      desc: "Meningkatkan daya saing produk lokal kerajinan bambu melalui pemasaran digital...",
    },
    {
      id: 4,
      category: "Pembangunan",
      date: "28 Nov 2025",
      title: "Perbaikan Jalan Usaha Tani Dusun Kangin",
      desc: "Pengecoran jalan sepanjang 500m telah selesai dilaksanakan secara gotong royong...",
    },
    {
      id: 5,
      category: "Sosial",
      date: "25 Nov 2025",
      title: "Penyaluran BLT Dana Desa Tahap Akhir",
      desc: "Penyaluran bantuan langsung tunai berjalan lancar dan tepat sasaran di Balai Desa...",
    },
    {
      id: 6,
      category: "Adat",
      date: "20 Nov 2025",
      title: "Persiapan Upacara Piodalan Pura Desa",
      desc: "Masyarakat mulai melakukan ngayah mempersiapkan sarana upakara untuk piodalan...",
    },
  ];

  /* ================= SCROLL NAVBAR ================= */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= FILTER ================= */
  const filteredNews = newsItems.filter((item) => {
    const matchCategory = category ? item.category === category : true;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

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
            {filteredNews.map((item) => (
              <NewsCard key={item.id} data={item} />
            ))}
          </div>

          {/* ================= PAGINATION ================= */}
          <div className="mt-14 flex justify-center gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
              Sebelumnya
            </button>
            <button className="px-4 py-2 bg-green-700 text-white rounded-md">
              1
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
              2
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
              Selanjutnya
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

/* ================= CARD BERITA ================= */
function NewsCard({ data }) {
  return (
    <article className="bg-white rounded-md overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition flex flex-col">
      <div className="h-52 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
        [Gambar Berita]
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
