"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ scrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const baseClasses = "fixed top-0 w-full z-50 transition-all duration-300";
  const navBackground = scrolled 
    ? "bg-white shadow-md border-b border-gray-100" 
    : "bg-transparent";

  const defaultTextColor = scrolled ? "text-gray-800" : "text-white";
  const accentTextColor = scrolled ? "text-green-600" : "text-green-300";
  const mobileToggleColor = scrolled ? "text-gray-800" : "text-green-300";
  const shadowClass = scrolled ? "" : "drop-shadow-lg";

  return (
    <nav className={`${baseClasses} ${navBackground}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO DESA */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg overflow-hidden">
              <Image src="/logo-sangket.png" width={90} height={90} alt="Logo" />
            </div>
            
            <Link 
              href="/" 
              className={`text-2xl font-extrabold tracking-tight ${shadowClass}`} 
            > 
              <span className={defaultTextColor}>Desa</span>{' '} 
              <span className={accentTextColor}>Sangket</span>
            </Link>
          </div>

          {/* KONTEN KANAN */}
          <div className="flex items-center gap-12 flex-grow justify-end"> 
            {/* MENU DESKTOP */}
            <div className="hidden md:flex space-x-8"> 
              <NavLink href="/" label="Beranda" scrolled={scrolled} active={pathname === "/"} />
              <NavLink href="/profil" label="Profil Desa" scrolled={scrolled} active={pathname === "/profil"} />
              <NavLink href="/berita" label="Kabar Desa" scrolled={scrolled} active={pathname === "/berita"} />
              <NavLink href="/layanan" label="Layanan Online" scrolled={scrolled} active={pathname === "/layanan"} />
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

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl">
          <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3 flex flex-col"> 
            <MobileNavLink href="/" label="Beranda" active={pathname === "/"} />
            <MobileNavLink href="/profil" label="Profil Desa" active={pathname === "/profil"} />
            <MobileNavLink href="/berita" label="Kabar Desa" active={pathname === "/berita"} />
            <MobileNavLink href="/layanan" label="Layanan Surat" active={pathname === "/layanan"} />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, label, scrolled, active }) { 
    // Menentukan warna teks saat aktif:
    // Jika scrolled: Teks hijau pekat (green-600)
    // Jika transparan: Teks hijau terang (green-400) agar menyala di atas background gelap
    const activeColor = scrolled ? "text-green-600" : "text-green-400";
    const inactiveColor = scrolled ? "text-gray-700" : "text-white";
    
    const textColor = active ? activeColor : inactiveColor;
    const hoverColor = scrolled ? "hover:text-green-600" : "hover:text-green-300";
    const shadowClass = scrolled ? "" : "drop-shadow-lg"; 

    return (
      <Link 
        href={href} 
        className={`relative pb-2 font-medium transition duration-200 ${textColor} ${hoverColor} ${shadowClass} group`}
      >
        {label}
        {/* Element Garis Bawah - Menggunakan bg-current agar warnanya sama dengan teks */}
        <span 
          className={`absolute left-0 -bottom-1 h-[3px] bg-current transition-all duration-300 
          ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}
        ></span>
      </Link>
    );
}

function MobileNavLink({ href, label, active }) {
  return (
    <Link 
      href={href} 
      className={`block px-3 py-2 rounded-md text-base font-medium transition
      ${active 
        ? "text-green-600 bg-green-50 border-l-4 border-green-600" 
        : "text-gray-700 hover:text-green-600 hover:bg-green-50"}`}
    >
      {label}
    </Link>
  );
}