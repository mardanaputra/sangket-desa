import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">

      {/* 1. HERO SECTION (Wajah Website) */}
      <section className="relative bg-green-50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* Kiri: Teks */}
          <div className="z-10 relative">
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
              Website Resmi Pemerintah Desa
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Membangun Desa <br />
              <span className="text-green-600">Sangket</span> yang Mandiri.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Pusat informasi pelayanan publik, transparansi anggaran, dan potensi desa.
              Melayani masyarakat dengan sepenuh hati demi kemajuan bersama.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/profil" className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-lg hover:shadow-green-200">
                Profil Desa
              </Link>
              <Link href="/layanan" className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:border-green-600 hover:text-green-600 transition">
                Layanan Online
              </Link>
            </div>
          </div>

          {/* Kanan: Placeholder Gambar (Kotak Abu-abu Sementara) */}
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/desa-sangket.jpg"           // 1. Memanggil file dari folder public
              alt="Suasana Desa Sangket" // 2. Deskripsi untuk Google (SEO)
              fill                      // 3. Agar gambar memenuhi kotak pembungkusnya
              className="object-cover"  // 4. Agar gambar tidak gepeng (crop otomatis)
              priority                  // 5. Agar loading gambar ini diutamakan
            />
          </div>
        </div>
      </section>

      {/* 2. STATISTIK SINGKAT (Section Kepercayaan) */}
      <section className="py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="3.5K" label="Penduduk" />
            <StatCard number="4" label="Dusun" />
            <StatCard number="120+" label="UMKM Aktif" />
            <StatCard number="24 Jam" label="Layanan Online" />
          </div>
        </div>
      </section>

      {/* 3. BERITA TERKINI (Section Dinamis) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Kabar Desa Sangket</h2>
              <p className="text-gray-500">Update terbaru kegiatan dan informasi desa.</p>
            </div>
            <Link href="/berita" className="hidden md:inline-block text-green-600 font-medium hover:underline">
              Lihat Semua Berita →
            </Link>
          </div>

          {/* Grid Berita */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Berita Dummy 1 */}
            <NewsCard
              category="Pemerintahan"
              date="08 Des 2025"
              title="Musyawarah Perencanaan Pembangunan Desa Tahun 2025"
              desc="Pemerintah desa mengundang seluruh elemen masyarakat untuk berpartisipasi dalam..."
            />
            {/* Berita Dummy 2 */}
            <NewsCard
              category="Kesehatan"
              date="06 Des 2025"
              title="Jadwal Posyandu Balita & Lansia Bulan Ini"
              desc="Berikut adalah jadwal lengkap kegiatan Posyandu di setiap dusun untuk bulan Desember..."
            />
            {/* Berita Dummy 3 */}
            <NewsCard
              category="Ekonomi"
              date="01 Des 2025"
              title="Pelatihan Digital Marketing untuk UMKM Desa"
              desc="Meningkatkan daya saing produk lokal melalui pemasaran digital yang efektif..."
            />
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/berita" className="text-green-600 font-medium hover:underline">
              Lihat Semua Berita →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// --- Komponen Kecil (Biar kodingan di atas rapi) ---

function StatCard({ number, label }) {
  return (
    <div className="p-4">
      <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
      <div className="text-gray-500 font-medium">{label}</div>
    </div>
  );
}

function NewsCard({ category, date, title, desc }) {
  return (
    <div className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 bg-white">
      {/* Kotak Gambar Dummy */}
      <div className="h-48 bg-gray-200 w-full relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          [Thumbnail Berita]
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">{category}</span>
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}