"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// Navbar sekarang menerima prop 'scrolled'
export default function Navbar({ scrolled }) {
// ... KODE NAVBAR ANDA YANG SAMA PERSIS ...
// Logic penentuan kelas sudah benar:
// const navBackground = scrolled 
//   ? "bg-white shadow-md border-b border-gray-100" 
//   : "bg-transparent"; 
// ...
// Penentuan warna teks juga sudah benar.

  const [isOpen, setIsOpen] = useState(false);

  // Penentuan kelas dinamis untuk background dan shadow
  const baseClasses = "fixed top-0 w-full z-50 transition-all duration-300";
  const navBackground = scrolled 
    ? "bg-white shadow-md border-b border-gray-100" // Opaque putih saat di-scroll
    : "bg-transparent"; // Transparan saat di atas

  // Penentuan warna teks dinamis
  const defaultTextColor = scrolled ? "text-gray-800" : "text-white";
  const accentTextColor = scrolled ? "text-green-600" : "text-green-300";
  const mobileToggleColor = scrolled ? "text-gray-800" : "text-green-300";

  // Penentuan shadow dinamis (Drop shadow hanya saat transparan)
  const shadowClass = scrolled ? "" : "drop-shadow-lg";


  return (
    <nav className={`${baseClasses} ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between h-20 items-center">
          
         {/* LOGO DESA */}
<div className="flex-shrink-0 flex items-center gap-2">
  <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
    {/* Image component */}
    <Image src="/logo-sangket.png" width={90} height={90} alt="Logo" />
  </div>
  
  {/* Judul: Lebih Besar (text-2xl) & Tambahkan Spasi di antara kata */}
  <Link 
    href="/" 
    // Mengubah ukuran teks dari text-xl menjadi text-2xl
    className={`text-2xl font-extrabold tracking-tight ${shadowClass}`} 
  > 
    {/* Pastikan ada spasi di antara dua span */}
    <span className={defaultTextColor}>Desa</span>{' '} 
    <span className={accentTextColor}>Sangket</span>
  </Link>
</div>

          {/* KONTEN KANAN */}
          <div className="flex items-center gap-12 flex-grow justify-end"> 
            
            {/* MENU DESKTOP */}
            <div className="hidden md:flex space-x-12"> 
              <NavLink href="/" label="Beranda" scrolled={scrolled} />
              <NavLink href="/profil" label="Profil Desa" scrolled={scrolled} />
              <NavLink href="/berita" label="Kabar Desa" scrolled={scrolled} />
              <NavLink href="/layanan" label="Layanan Surat" scrolled={scrolled} />
            </div>

            {/* TOMBOL LOGIN */}
            <div className="hidden md:flex">
              <button className="bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition shadow-2xl hover:shadow-green-300">
                Masuk
              </button>
            </div>
          </div>

          {/* TOMBOL MENU HP */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${mobileToggleColor} hover:text-green-600 focus:outline-none ${shadowClass}`} 
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE (Tetap putih agar terbaca) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl">
          <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3 flex flex-col"> 
            <MobileNavLink href="/" label="Beranda" />
            <MobileNavLink href="/profil" label="Profil Desa" />
            <MobileNavLink href="/berita" label="Kabar Desa" />
            <MobileNavLink href="/layanan" label="Layanan Surat" />
          </div>
        </div>
      )}
    </nav>
  );
}

// NavLink Component - Dynamic Styles
function NavLink({ href, label, scrolled }) { 
    const textColor = scrolled ? "text-gray-700" : "text-white"; // Jika scroll, teks gelap
    const hoverColor = scrolled ? "hover:text-green-600" : "hover:text-green-300";
    const shadowClass = scrolled ? "" : "drop-shadow-lg"; 
    const hoverShadow = scrolled ? "" : "hover:drop-shadow-xl";

    return (
      <Link 
        href={href} 
        className={`${textColor} font-medium transition duration-200 ${shadowClass} ${hoverColor} ${hoverShadow}`}
      >
        {label}
      </Link>
    );
}

// MobileNavLink Component (Tidak Berubah)
function MobileNavLink({ href, label }) {
  return (
    <Link href={href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">
      {label}
    </Link>
  );
}