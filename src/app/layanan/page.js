"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// =========================================================================
// DATA LAYANAN (STATIS)
// =========================================================================
const layananList = [
  {
    title: "Surat Keterangan Usaha",
    desc: "Untuk keperluan pengajuan KUR atau administrasi bank.",
    syarat: [
      "Fotocopy KTP & KK",
      "Foto lokasi usaha",
      "Lunas PBB tahun terakhir",
    ],
    templateUrl: "/templates/sku_formulir.docx",
  },
  {
    title: "Surat Keterangan Menikah",
    desc: "Pengantar dan keterangan untuk mengurus pernikahan (N1, N2, N4).",
    syarat: [
      "Fotocopy KTP calon suami & istri",
      "Fotocopy KK",
      "Pas foto 3x4 (3 lembar)",
      "Surat pengantar RT/RW",
    ],
    templateUrl: "/templates/surat_keterangan_menikah.docx",
  },
  {
    title: "Surat Keterangan Domisili",
    desc: "Keterangan tempat tinggal sementara atau pindahan.",
    syarat: [
      "Fotocopy KTP & KK",
      "Surat Pengantar RT/RW",
      "Pas foto 3x4 (2 lembar)",
    ],
    templateUrl: "/templates/skd_permohonan.docx",
  },
  {
    title: "Surat Pengantar KTP / KK",
    desc: "Pembuatan baru, perubahan data, atau KTP hilang.",
    syarat: [
      "Fotocopy Akta Kelahiran/Ijazah",
      "Fotocopy KK Lama (jika ada)",
      "Surat Kehilangan (jika hilang)",
    ],
    templateUrl: "/templates/ktp_kk_formulir.docx",
  },
  {
    title: "Surat Keterangan Tidak Mampu",
    desc: "Untuk keperluan beasiswa sekolah atau bantuan kesehatan.",
    syarat: [
      "Fotocopy KTP & KK",
      "Surat Pengantar RT/RW",
      "Foto kondisi rumah (depan, samping, dalam)",
    ],
    templateUrl: "/templates/sktm_permohonan.docx",
  },
  {
    title: "Surat Keterangan Kelahiran",
    desc: "Pengantar untuk pembuatan Akta Kelahiran.",
    syarat: [
      "Fotocopy KTP Orang Tua & Saksi",
      "Surat Keterangan Bidan/RS",
      "Fotocopy KK & Buku Nikah",
    ],
    templateUrl: "/templates/sk_kelahiran.docx",
  },
  {
    title: "Surat Kematian",
    desc: "Pelaporan warga meninggal dunia untuk update KK.",
    syarat: [
      "Fotocopy KTP & KK Almarhum",
      "Surat Keterangan RS/Dokter",
      "Fotocopy KTP Pelapor",
    ],
    templateUrl: "/templates/sk_kematian.docx",
  },
];

export default function Layanan() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} />

      <main className="bg-gray-50 min-h-screen pb-20">
        {/* ================= HERO SECTION ================= */}
        <section className="relative pt-28 pb-32 px-6 text-center text-white overflow-hidden">
          <Image
            src="/hero-buleleng-2.webp"
            alt="Layanan Administrasi Desa Sangket"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Layanan Administrasi Desa
            </h1>
            <p className="text-gray-200 text-lg">
              Cek persyaratan surat menyurat di sini sebelum datang ke kantor desa
              agar pelayanan lebih cepat dan efisien.
            </p>
          </div>
        </section>

        {/* ================= KONTEN UTAMA ================= */}
        <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
          
          {/* 1. INFO JAM KERJA */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-4 border-l-4 border-green-600 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Jam Pelayanan Kantor
              </h3>
              <p className="text-gray-600 text-sm">
                Senin - Kamis (08.00 - 15.00) | Jumat (08.00 - 13.00)
              </p>
            </div>

            <Link
              href="https://wa.me/6281234567890"
              target="_blank"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold text-sm transition flex items-center gap-2 shadow-lg"
            >
              Hubungi Admin
            </Link>
          </div>

          {/* 2. PEMBAYARAN IURAN KRAMA (KOTAK BARU) */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-10 border-l-4 border-green-600 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Pembayaran Iuran Krama
              </h3>
              <p className="text-gray-600 text-sm">
                Lakukan pembayaran iuran bulanan krama desa secara mandiri melalui layanan digital kami.
              </p>
            </div>

            {/* Placeholder Tombol Bayar */}
            <Link
              href="/pembayaran" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full font-bold text-sm transition flex items-center gap-2 shadow-lg"
            >
              Bayar Sekarang
            </Link>
          </div>

          {/* GRID LAYANAN SURAT-MENYURAT */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {layananList.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-green-600 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-green-700 font-semibold text-xs uppercase mb-2">
                    Persyaratan:
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside mb-4">
                    {item.syarat.map((syarat, i) => (
                      <li key={i}>{syarat}</li>
                    ))}
                  </ul>

                  {item.templateUrl && (
                    <Link
                      href={item.templateUrl}
                      target="_blank"
                      download
                      className="inline-flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-md"
                    >
                      Unduh Template Surat
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}