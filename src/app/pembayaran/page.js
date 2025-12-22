"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function PembayaranIuran() {
  const [scrolled, setScrolled] = useState(false);

  // Efek untuk mendeteksi scroll agar Navbar berubah warna
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar dengan state scrolled yang sinkron */}
      <Navbar scrolled={scrolled} />

      <main className="bg-gray-50 min-h-screen pb-20">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-28 pb-32 px-6 text-center text-white overflow-hidden">
          <Image
            src="/hero-buleleng-3.jpg" // Menggunakan aset yang sudah ada
            alt="Pembayaran Iuran Krama Desa Sangket"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-green-900/60" /> {/* Overlay Hijau Transparan */}

          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Aplikasi Iuran Krama
            </h1>
            <p className="text-gray-100 text-lg opacity-90">
              Sistem informasi pembayaran iuran bulanan Desa Adat Sangket secara mandiri dan transparan.
            </p>
          </div>
        </section>

        {/* ================= KONTEN UTAMA ================= */}
        <section className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            
            {/* Judul Dalam Kotak */}
            <div className="text-center mb-10">
              <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                Layanan Digital Desa
              </span>
              <h2 className="text-3xl font-bold text-gray-800">Formulir Iuran Digital</h2>
              <div className="w-20 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Placeholder Form Pembayaran (Bisa dikembangkan nanti) */}
            <div className="space-y-6">
              <div className="p-10 border-2 border-dashed border-gray-200 rounded-2xl text-center">
                <div className="text-5xl mb-4">💳</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Segera Hadir</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Fitur integrasi pembayaran (Payment Gateway) sedang dalam tahap pengembangan teknis untuk mendukung transaksi non-tunai.
                </p>
              </div>

              {/* Informasi Iuran */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-green-600">📌</span> Iuran Wajib
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Pembayaran iuran bulanan krama macelek dan krama tamiu sesuai hasil paruman desa.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-green-600">🛡️</span> Keamanan
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Setiap transaksi akan mendapatkan bukti bayar digital yang sah dan tercatat secara otomatis.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Tombol Kembali */}
          <div className="mt-10 text-center">
             <button 
               onClick={() => window.history.back()}
               className="text-gray-500 hover:text-green-700 font-medium transition-colors flex items-center gap-2 mx-auto"
             >
               ← Kembali ke Layanan
             </button>
          </div>
        </section>
      </main>
    </>
  );
}