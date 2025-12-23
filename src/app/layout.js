// src/app/layout.js
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  metadataBase: new URL('https://desasangket.id'), // Ganti dengan domain asli nanti
  title: {
    default: "Desa Sangket - Mandiri & Transparan",
    template: "%s | Desa Sangket"
  },
  description: "Website Resmi Pemerintahan Desa Sangket. Pusat informasi pelayanan publik, transparansi anggaran, dan potensi desa berbasis digital.",
  keywords: ["Desa Sangket", "Website Desa", "Layanan Desa Online", "Buleleng", "Desa Adat"],
  authors: [{ name: "Pemerintah Desa Sangket" }],
  openGraph: {
    title: "Desa Sangket",
    description: "Website Pemerintahan Desa Sangket yang Maju dan Transparan",
    url: 'https://desasangket.id',
    siteName: 'Desa Sangket',
    images: [
      {
        url: '/desa-sangket.jpg', // File dari public/desa-sangket.jpg
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  // 👇 BAGIAN INI DITAMBAHKAN UNTUK VERIFIKASI GOOGLE
  verification: {
    google: "gMiGK8i8RvvLrMsVCSkk7osW4XucWqU2OzvyrcWhvTM",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {/* Navbar dipasang global di sini agar muncul di semua halaman */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}