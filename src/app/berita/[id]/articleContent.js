"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import useNewsStore from "@/store/useNewsStore";

// Terima prop 'formattedDate'
export default function ArticleContent({ news, categories, formattedDate }) {
  const router = useRouter();
  const { getImageUrl } = useNewsStore();

  const [selectedCategory, setSelectedCategory] = useState(
    news.category_id ? String(news.category_id) : ""
  );

  const safeCategories = useMemo(
    () => (Array.isArray(categories) ? categories : []),
    [categories]
  );

  const categoryName = news.categories?.name || "Umum";
  const authorName = news.author?.name || news.author || "Admin Desa";

  return (
    <main className="bg-white min-h-screen pb-20">
      <Navbar scrolled={true} />

      {/* Gambar Utama */}
      <div className="w-full h-[450px] bg-gray-200 relative">
        <Image
          src={getImageUrl(news.image)}
          alt={news.title || "Berita"}
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <article className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          
          {/* ... (Bagian Breadcrumb & Dropdown sama seperti sebelumnya) ... */}
          
           <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-green-600 transition">Beranda</Link>
            <span>/</span>
            <Link href="/berita" className="hover:text-green-600 transition">Kabar Desa</Link>
            <span>/</span>
            <span className="text-green-600 font-medium truncate">{news.title}</span>
          </div>

          <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            {categoryName}
          </span>
          
          {/* JUDUL */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            {news.title}
          </h1>

          {/* Metadata */}
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
              <span className="text-lg">📅</span>{" "}
              {/* GUNAKAN PROPS, BUKAN FUNGSI DI SINI */}
              {formattedDate}
            </div>
          </div>

          {/* Konten (HTML) */}
          <div
            className="prose prose-lg md:prose-xl text-gray-700 leading-relaxed max-w-none 
                        prose-headings:text-gray-900 prose-a:text-green-600 prose-img:rounded-2xl"
            dangerouslySetInnerHTML={{ __html: news.content || "" }}
          />
        </div>
        
        {/* Tombol Kembali */}
         <div className="mt-16 text-center">
          <Link
            href="/berita"
            className="inline-flex items-center gap-3 text-green-700 font-bold hover:gap-5 transition-all"
          >
            <span>←</span> Kembali ke Daftar Berita
          </Link>
        </div>

      </article>
    </main>
  );
}