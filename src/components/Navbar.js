"use client"; // Wajib ada karena kita pakai interaksi (klik tombol menu)

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO DESA */}
          <div className="flex-shrink-0 flex items-center gap-2">
             {/* Kamu bisa ganti ini dengan <Image> logo desa nanti */}
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
              <Image src="/logo-sangket.png" width={40} height={40} alt="Logo" />
            </div>
            <Link href="/" className="text-xl font-bold text-gray-800 tracking-tight">
              Desa <span className="text-green-600">Sangket</span>
            </Link>
          </div>

          {/* MENU DESKTOP (Hilang di HP) */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="/" label="Beranda" />
            <NavLink href="/profil" label="Profil Desa" />
            <NavLink href="/berita" label="Kabar Desa" />
            <NavLink href="/layanan" label="Layanan Surat" />
          </div>

          {/* TOMBOL LOGIN (Opsional) */}
          <div className="hidden md:flex">
            <button className="bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition">
              Masuk
            </button>
          </div>

          {/* TOMBOL MENU HP (Hanya muncul di HP) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-600 focus:outline-none"
            >
              {/* Ikon Garis Tiga / Silang */}
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

      {/* MENU MOBILE (Muncul saat tombol ditekan) */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
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

// Komponen Kecil untuk Link (Supaya kodingan rapi)
function NavLink({ href, label }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-green-600 font-medium transition duration-200">
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label }) {
  return (
    <Link href={href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50">
      {label}
    </Link>
  );
}