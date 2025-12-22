"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

/* ================== KOMPONEN KECIL ================== */

function MisiItem({ text }) {
  return (
    <li className="flex items-start text-gray-700">
      <span className="text-green-600 mr-3 mt-1 font-extrabold text-sm">▶</span>
      <p className="flex-1 leading-relaxed text-sm">{text}</p>
    </li>
  );
}

function ProfileCardNoPhoto({ name, role }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative z-10">
      <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-full mx-auto mb-3 flex items-center justify-center border border-green-500 shadow-inner">
        <span className="text-green-700 text-xl font-bold uppercase">
          {name.split(" ")[0][0]}
          {name.split(" ").length > 1 ? name.split(" ").pop()[0] : ""}
        </span>
      </div>
      <h4 className="font-bold text-gray-800 text-sm mb-1 leading-tight">{name}</h4>
      <p className="text-green-600 text-[10px] font-bold uppercase tracking-wider">{role}</p>
    </div>
  );
}

/* ================== NAVIGASI KOMPONEN ================== */

function MobileNavTabs({ menuItems, activeHash, SCROLL_OFFSET }) {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.substring(1));
    if (el) {
      window.scrollTo({
        top: el.offsetTop - SCROLL_OFFSET,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-16 lg:hidden z-30 bg-white/90 backdrop-blur-md shadow-sm border-b overflow-hidden">
      <div className="overflow-x-auto whitespace-nowrap px-4 py-3 scrollbar-hide">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={(e) => handleScrollTo(e, item.href)}
            className={`inline-block px-5 py-2 mx-1 text-xs font-bold rounded-full transition-all
              ${activeHash === item.href ? "bg-green-600 text-white shadow-md" : "text-gray-600 bg-gray-50"}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProfilSidebar({ menuItems, activeHash, SCROLL_OFFSET }) {
  const handleScrollTo = (e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.substring(1));
    if (el) {
      window.scrollTo({
        top: el.offsetTop - SCROLL_OFFSET,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-24 h-fit w-full">
      <div className="bg-white p-6 shadow-xl border border-gray-100 rounded-2xl">
        <h3 className="font-bold text-lg text-gray-900 mb-5 border-b pb-3 text-sm">Daftar Isi Profil</h3>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className={`flex items-center p-3 text-xs rounded-xl transition-all
                  ${activeHash === item.href 
                    ? "bg-green-600 text-white font-bold shadow-lg shadow-green-200" 
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ================== MAIN PAGE ================== */

export default function Profil() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const SCROLL_OFFSET = 100;

  const menuItems = [
    { name: "Sejarah Desa", href: "#sejarah" },
    { name: "Visi & Misi", href: "#visi-misi" },
    { name: "Struktur Organisasi", href: "#struktur" },
    { name: "Peta & Lokasi", href: "#peta" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = menuItems
      .map((i) => document.getElementById(i.href.substring(1)))
      .filter(Boolean);

    const handleSpy = () => {
      let current = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        if (window.scrollY >= sections[i].offsetTop - SCROLL_OFFSET - 20) {
          current = `#${sections[i].id}`;
          break;
        }
      }
      setActiveHash(current || menuItems[0].href);
    };

    window.addEventListener("scroll", handleSpy);
    handleSpy();
    return () => window.removeEventListener("scroll", handleSpy);
  }, []);

  return (
    <div className="bg-gray-50">
      <Navbar scrolled={scrolled} />

      <main className="min-h-screen pb-32">
        {/* HERO SECTION */}
        <section className="relative h-[350px] flex items-center justify-center text-center text-white">
          <Image
            src="/hero-buleleng.jpg"
            alt="Profil Desa Sangket"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-green-950/60" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 mt-16 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Profil Desa Sangket
            </h1>
            <p className="text-green-100 text-sm md:text-base font-medium max-w-2xl mx-auto">
              Melestarikan adat, membangun kemandirian, dan melayani masyarakat dengan sepenuh hati.
            </p>
          </div>
        </section>

        <MobileNavTabs menuItems={menuItems} activeHash={activeHash} SCROLL_OFFSET={SCROLL_OFFSET} />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12 mt-12 relative z-20">
          <div className="hidden lg:block lg:col-span-1">
            <ProfilSidebar menuItems={menuItems} activeHash={activeHash} SCROLL_OFFSET={SCROLL_OFFSET} />
          </div>

          <div className="lg:col-span-3 space-y-12">
            
            {/* 1. SEJARAH */}
            <section id="sejarah" className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-1 bg-green-600 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Sejarah Desa</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                Desa Sangket Buleleng merupakan desa adat kuno yang telah eksis sejak era Mpu Kuturan. Desa ini memiliki nilai historis yang tinggi karena pernah menjadi lokasi Puri Sukasada Ki Gusti Anglurah Panji Sakti.
              </p>
            </section>

            {/* 2. VISI MISI */}
            <section id="visi-misi" className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 scroll-mt-24">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-1 bg-green-600 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Visi & Misi</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MisiItem text="Terwujudnya Desa Sangket yang Maju, Sejahtera, Berbudaya, dan Berbasis Lingkungan." />
                <MisiItem text="Meningkatkan Tata Kelola Pemerintahan Desa yang baik, transparan, dan bersih." />
              </ul>
            </section>

            {/* 3. STRUKTUR ORGANISASI (REVISI GARIS NYAMBUNG) */}
            <section id="struktur" className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 scroll-mt-24 overflow-hidden">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Struktur Organisasi</h2>
                <div className="w-16 h-1 bg-green-600 mx-auto mt-3 rounded-full" />
              </div>

              <div className="space-y-12 relative">
                
                {/* TINGKAT 1: KEPALA DESA */}
                <div className="flex justify-center relative">
                  <div className="w-full max-w-[220px]">
                    <ProfileCardNoPhoto name="I Wayan Sudarsana, S.T." role="Kepala Desa" />
                  </div>
                  <div className="absolute -bottom-12 w-[2px] bg-green-600 h-12 hidden md:block"></div>
                </div>

                {/* TINGKAT 2: SEKRETARIS */}
                <div className="flex justify-center relative">
                  <div className="w-full max-w-[220px]">
                    <ProfileCardNoPhoto name="Ni Putu Dian Lestari" role="Sekretaris Desa" />
                  </div>
                  <div className="absolute -bottom-12 w-[2px] bg-green-600 h-12 hidden md:block"></div>
                </div>

                {/* TINGKAT 3: KAUR & KASI */}
                <div className="relative pt-6">
                  {/* Garis horisontal 2px */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[2px] bg-green-600 hidden md:block"></div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                    <div className="absolute -top-6 left-[12.5%] w-[2px] h-6 bg-green-600 hidden lg:block"></div>
                    <div className="absolute -top-6 left-[37.5%] w-[2px] h-6 bg-green-600 hidden lg:block"></div>
                    <div className="absolute -top-6 left-[62.5%] w-[2px] h-6 bg-green-600 hidden lg:block"></div>
                    <div className="absolute -top-6 left-[87.5%] w-[2px] h-6 bg-green-600 hidden lg:block"></div>
                    
                    <ProfileCardNoPhoto name="I Gede Eka Putra" role="Kaur Keuangan" />
                    <ProfileCardNoPhoto name="Ni Komang Sri Wahyuni" role="Kaur Umum & TU" />
                    <ProfileCardNoPhoto name="I Made Adi Wijaya" role="Kasi Pemerintahan" />
                    <ProfileCardNoPhoto name="I Ketut Satria" role="Kasi Kesejahteraan" />
                  </div>

                  {/* Jalur vertikal menyambung ke tingkat bawah */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-green-600 hidden md:block"></div>
                </div>

                {/* TINGKAT 4: KEWILAYAHAN (REVISI GARIS & TEKS) */}
                <div className="relative pt-10">
                  {/* Garis horisontal dusun 2px - SEKARANG MENYAMBUNG UTUH */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[2px] bg-green-600 hidden md:block"></div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto relative">
                    {/* Garis vertikal dusun menyambung dari garis horisontal */}
                    <div className="absolute -top-10 left-[16.6%] w-[2px] h-10 bg-green-600 hidden sm:block"></div>
                    <div className="absolute -top-10 left-[50%] w-[2px] h-10 bg-green-600 hidden sm:block"></div>
                    <div className="absolute -top-10 left-[83.3%] w-[2px] h-10 bg-green-600 hidden sm:block"></div>

                    <ProfileCardNoPhoto name="I Nyoman Gede" role="Kadun Sangket" />
                    <ProfileCardNoPhoto name="I Putu Bagus" role="Kadun Labak" />
                    <ProfileCardNoPhoto name="I Made Suara" role="Kadun Bale Agung" />
                  </div>
                </div>
              </div>
            </section>

            {/* 4. PETA LOKASI */}
            <section id="peta" className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Peta & Lokasi</h2>
              <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-inner border-2 border-gray-50">
                <iframe
                  title="Peta Desa Sangket"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15783.31505307328!2d115.0872651!3d-8.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDcnMjQuNCJTIDExNcKwMDUnMTQuMiJF!5e0!3m2!1sid!2sid!4v1624450000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                  allowFullScreen
                />
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}