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
            <p className="flex-1">{text}</p>
        </li>
    );
}

function ProfileCardNoPhoto({ name, role }) {
    return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-100 text-center hover:shadow-lg transition">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center border-2 border-green-500">
                <span className="text-gray-600 text-2xl font-bold">
                    {name.split(" ")[0][0]}
                    {name.split(" ").length > 1
                        ? name.split(" ")[name.split(" ").length - 1][0]
                        : ""}
                </span>
            </div>
            <h4 className="font-bold text-lg text-gray-800 mb-0.5">{name}</h4>
            <p className="text-green-600 text-sm font-medium">{role}</p>
        </div>
    );
}

/* ================== MOBILE NAV ================== */

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
        <div className="sticky top-16 lg:hidden z-30 bg-white shadow-md border-b">
            <div className="overflow-x-auto whitespace-nowrap px-4 py-2 scrollbar-hide">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleScrollTo(e, item.href)}
                        className={`inline-block px-4 py-2 mx-1 text-sm font-medium rounded-full transition
                            ${
                                activeHash === item.href
                                    ? "bg-green-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

/* ================== SIDEBAR DESKTOP ================== */

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
        <nav className="sticky top-24 h-[calc(100vh-96px)] overflow-y-auto w-full">
            <div className="bg-white p-5 shadow-xl border border-gray-100 rounded-md pb-6">
                <h3 className="font-bold text-xl text-gray-800 mb-4 border-b pb-2">
                    Navigasi Profil
                </h3>
                <ul className="space-y-1.5">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                onClick={(e) => handleScrollTo(e, item.href)}
                                className={`flex items-center p-3 text-sm rounded-md transition
                                    ${
                                        activeHash === item.href
                                            ? "bg-green-100 text-green-700 font-bold"
                                            : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                                    }`}
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

/* ================== HALAMAN UTAMA ================== */

export default function Profil() {
    const [scrolled, setScrolled] = useState(false);
    const [activeHash, setActiveHash] = useState("");
    const SCROLL_OFFSET = 70;

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

        const onScroll = () => {
            let current = "";
            for (let i = sections.length - 1; i >= 0; i--) {
                if (window.scrollY >= sections[i].offsetTop - SCROLL_OFFSET - 5) {
                    current = `#${sections[i].id}`;
                    break;
                }
            }
            if (!current && sections.length) current = menuItems[0].href;
            setActiveHash(current);
        };

        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="relative">
            <Navbar scrolled={scrolled} />

            <main className="bg-gray-50 min-h-screen pt-20 pb-32">
                {/* HERO */}
                <section className="relative py-24 text-center text-white -mt-20">
                    <Image
                        src="/hero-buleleng.jpg"
                        alt="Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-green-900/50" />
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            Profil Desa Sangket
                        </h1>
                        <p className="text-green-200 text-lg">
                            Mengenal desa lebih dekat
                        </p>
                    </div>
                </section>

                <MobileNavTabs
                    menuItems={menuItems}
                    activeHash={activeHash}
                    SCROLL_OFFSET={SCROLL_OFFSET}
                />

                <div className="max-w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-10 mt-8 pb-24 relative z-20">
                    <div className="hidden lg:block lg:col-span-1">
                        <ProfilSidebar
                            menuItems={menuItems}
                            activeHash={activeHash}
                            SCROLL_OFFSET={SCROLL_OFFSET}
                        />
                    </div>

                    <div className="lg:col-span-3 space-y-12">
                        {/* SEJARAH */}
                        <section
                            id="sejarah"
                            className="bg-white rounded-lg shadow-2xl p-6 md:p-10 border"
                        >
                            <h2 className="text-3xl font-bold mb-4">
                                Sejarah Desa
                            </h2>
                            <p className="text-gray-700">
                                Desa Sangket Buleleng adalah desa adat kuno yang telah ada sejak era Mpu Kuturan, pernah menjadi lokasi Puri Sukasada Ki Gusti Anglurah Panji Sakti, dan kini terkenal karena memiliki tiga Pelinggih unik berbentuk mobil di area Pura Kahyangan Tiganya.
                            </p>
                        </section>

                        {/* VISI MISI */}
                        <section
                            id="visi-misi"
                            className="bg-white rounded-lg shadow-2xl p-6 md:p-10 border"
                        >
                            <h2 className="text-3xl font-bold mb-6">
                                Visi & Misi
                            </h2>
                            <ul className="space-y-3">
                                <MisiItem text="Terwujudnya Desa Sangket yang Maju, Sejahtera, Berbudaya, dan Berbasis Lingkungan menuju masyarakat mandiri dan berdaya saing." />
                                <MisiItem text="Meningkatkan Tata Kelola Pemerintahan Desa yang baik dan bersih (Good Governance)" />
                                <MisiItem text="Meningkatkan Pembangunan Infrastruktur desa yang merata, berkualitas, dan berkelanjutan" />
                                <MisiItem text="Meningkatkan Kesejahteraan Masyarakat melalui pengembangan potensi ekonomi lokal dan pemberdayaan masyarakat" />
                            </ul>
                        </section>

                        {/* STRUKTUR */}
                        <section
                            id="struktur"
                            className="bg-white rounded-lg shadow-2xl p-8 border"
                        >
                            <h2 className="text-3xl font-bold mb-8 text-center">
                                Struktur Organisasi
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <ProfileCardNoPhoto
                                    name="I Wayan Nama"
                                    role="Kepala Desa"
                                />
                                <ProfileCardNoPhoto
                                    name="Ni Kadek Sekretaris"
                                    role="Sekdes"
                                />
                            </div>
                        </section>

                        {/* PETA */}
                        <section
    id="peta"
    className="bg-white rounded-lg shadow-2xl p-6 md:p-8 border space-y-4"
>
    <h2 className="text-3xl font-bold text-gray-800">
        Peta & Lokasi Desa
    </h2>

    <p className="text-gray-600">
        Lokasi Desa Sangket, Kecamatan Sukasada, Kabupaten Buleleng, Bali.
    </p>

    <div className="w-full h-[400px] rounded-lg overflow-hidden border">
        <iframe
            title="Peta Desa Sangket Buleleng Bali"
            src="https://www.google.com/maps?q=Desa%20Sangket%20Buleleng%20Bali&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
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
