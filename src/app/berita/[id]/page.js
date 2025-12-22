"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import useNewsStore from "@/store/useNewsStore";
import Navbar from "@/components/Navbar";

export default function DetailBerita() {
  const { id } = useParams();
  
  const { 
    singleNews, 
    loading, 
    error, 
    fetchNewsById, 
    getImageUrl, 
    clearSingleNews 
  } = useNewsStore();

  /**
   * Helper: Format Tanggal Indonesia Dinamis
   */
  const formatDate = (dateString) => {
    if (!dateString) return "Tanggal tidak tersedia";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  useEffect(() => {
    if (id) {
      fetchNewsById(id);
    }
    return () => {
      if (clearSingleNews) clearSingleNews();
    };
  }, [id, fetchNewsById, clearSingleNews]);

  /* ================= 1. PENANGANAN LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat isi berita...</p>
        </div>
      </div>
    );
  }

  /* ================= 2. PENANGANAN ERROR ================= */
  if (error || (!loading && !singleNews)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-gray-600 text-lg mb-8">{error || "Maaf, berita tidak ditemukan."}</p>
        <Link href="/berita" className="bg-green-700 text-white px-8 py-3 rounded-full hover:bg-green-800 transition shadow-lg">
          Kembali ke Kabar Desa
        </Link>
      </div>
    );
  }

  /* ================= 3. TAMPILAN DINAMIS ================= */
  
  // Ambil nama penulis secara dinamis (mendukung objek atau string langsung)
  const authorName = singleNews.author?.name || singleNews.author || "Admin Desa";

  return (
    <main className="bg-white min-h-screen pb-20">
      <Navbar scrolled={true} />
      
      {/* Gambar Utama Dinamis */}
      <div className="w-full h-[450px] bg-gray-200 relative">
        <Image 
          src={getImageUrl(singleNews.image)} 
          alt={singleNews.title}
          fill
          priority
          unoptimized={true} // Bypass error 400 di localhost
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <article className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          
          {/* Breadcrumb Dinamis */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-green-600 transition">Beranda</Link>
            <span>/</span>
            <Link href="/berita" className="hover:text-green-600 transition">Kabar Desa</Link>
            <span>/</span>
            <span className="text-green-600 font-medium truncate">{singleNews.title}</span>
          </div>

          <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            {singleNews.category}
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {singleNews.title}
          </h1>
          
          {/* METADATA DINAMIS: PENULIS & TANGGAL */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold uppercase">
                {authorName.charAt(0)}
              </div>
              <div>
                <p className="text-gray-900 font-semibold">{authorName}</p>
                <p className="text-xs">Penulis Artikel</p>
              </div>
            </div>
            
            <div className="h-8 w-[1px] bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-2">
              <span className="text-lg">📅</span> {formatDate(singleNews.created_at || singleNews.date)}
            </div>
          </div>

          {/* Konten Utama (HTML Dinamis) */}
          <div 
            className="prose prose-lg md:prose-xl text-gray-700 leading-relaxed max-w-none 
                       prose-headings:text-gray-900 prose-a:text-green-600 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: singleNews.content }}
          />
        </div>

        <div className="mt-16 text-center">
          <Link href="/berita" className="inline-flex items-center gap-3 text-green-700 font-bold hover:gap-5 transition-all">
            <span>←</span> Kembali ke Daftar Berita
          </Link>
        </div>
      </article>
    </main>
  );
}