import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* KOLOM 1: IDENTITAS */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">Desa <span className="text-green-500">Sangket</span></h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Website Resmi Pemerintahan Desa Sangket, Kecamatan Sukasada, Kabupaten Buleleng, Bali.
            Mewujudkan pelayanan publik yang transparan dan akuntabel.
          </p>
        </div>

        {/* KOLOM 2: NAVIGASI (SEO Link) */}
        <div>
          <h4 className="text-white font-semibold mb-4">Jelajahi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/profil" className="hover:text-green-400 transition">Profil Desa</Link></li>
            <li><Link href="/berita" className="hover:text-green-400 transition">Kabar Terbaru</Link></li>
            <li><Link href="/layanan" className="hover:text-green-400 transition">Layanan Surat</Link></li>
            <li><Link href="/transparansi" className="hover:text-green-400 transition">Transparansi Dana</Link></li>
          </ul>
        </div>

        {/* KOLOM 3: KONTAK */}
        <div>
          <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Jl. Raya Sangket No. 123</li>
            <li>Sukasada, Buleleng, Bali</li>
            <li className="pt-2">📧 admin@sangketdesa.id</li>
            <li>📞 (0362) 1234567</li>
          </ul>
        </div>

        {/* KOLOM 4: SOSIAL MEDIA / JAM */}
        <div>
          <h4 className="text-white font-semibold mb-4">Jam Pelayanan</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex justify-between"><span>Senin - Kamis</span> <span>08:00 - 15:00</span></li>
            <li className="flex justify-between"><span>Jumat</span> <span>08:00 - 13:00</span></li>
            <li className="flex justify-between text-red-400"><span>Sabtu - Minggu</span> <span>Tutup</span></li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Pemerintah Desa Sangket. All rights reserved.
      </div>
    </footer>
  );
}