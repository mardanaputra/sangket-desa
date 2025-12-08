import Link from "next/link";

// Ini Data Dummy (Pura-puranya Database)
const newsDatabase = [
  {
    id: "1",
    title: "Musyawarah Perencanaan Pembangunan Desa 2025",
    date: "08 Des 2025",
    category: "Pemerintahan",
    author: "Admin Desa",
    content: `
      <p>Pemerintah Desa Sangket telah melaksanakan Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) untuk penyusunan RKPDes Tahun Anggaran 2025.</p>
      <p>Kegiatan ini dihadiri oleh seluruh perangkat desa, BPD, LPM, tokoh masyarakat, dan perwakilan dari setiap dusun. Dalam musyawarah ini, disepakati beberapa prioritas pembangunan infrastruktur dan pemberdayaan masyarakat.</p>
      <p>Kepala Desa menekankan pentingnya transparansi dalam setiap penggunaan anggaran agar manfaatnya bisa dirasakan langsung oleh warga.</p>
    `
  },
  {
    id: "2",
    title: "Jadwal Posyandu Balita & Lansia Bulan Desember",
    date: "06 Des 2025",
    category: "Kesehatan",
    author: "Bidan Desa",
    content: `
      <p>Demi meningkatkan kualitas kesehatan masyarakat, Pemerintah Desa mengumumkan jadwal Posyandu bulan Desember.</p>
      <p>Diharapkan ibu-ibu yang memiliki balita untuk rutin membawa anaknya guna pemantauan tumbuh kembang dan pemberian vitamin A.</p>
      <p>Untuk Lansia, pemeriksaan kesehatan gratis meliputi cek tensi, gula darah, dan asam urat akan dilaksanakan di Balai Banjar masing-masing.</p>
    `
  },
  // Kalau ID tidak ada di sini, nanti muncul "Berita Tidak Ditemukan"
];

export default async function DetailBerita({ params }) {
  // 1. Tangkap ID dari URL (misal: /berita/1 -> id = 1)
  const { id } = await params;

  // 2. Cari data berita yang cocok dengan ID tersebut
  const data = newsDatabase.find((item) => item.id === id);

  // 3. Kalau berita tidak ditemukan (misal orang ketik /berita/999)
  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
        <p className="text-gray-600 text-lg mb-6">Maaf, berita yang kamu cari tidak ditemukan.</p>
        <Link href="/berita" className="text-green-600 hover:underline">Kembali ke Kabar Desa</Link>
      </div>
    );
  }

  // 4. Kalau ketemu, Tampilkan Template Beritanya
  return (
    <main className="bg-white min-h-screen pb-20">
      
      {/* GAMBAR UTAMA (Hero Image) */}
      <div className="w-full h-[400px] bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          [Gambar Utama Berita: {data.title}]
        </div>
      </div>

      {/* KONTEN ARTIKEL */}
      <article className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          
          {/* Breadcrumb / Navigasi Kecil */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-green-600">Beranda</Link> / 
            <Link href="/berita" className="hover:text-green-600">Kabar Desa</Link> / 
            <span className="text-green-600 font-medium">Baca Berita</span>
          </div>

          {/* Judul & Info */}
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            {data.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {data.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">👤</span>
              {data.author}
            </div>
            <div>📅 {data.date}</div>
          </div>

          {/* Isi Berita (Render HTML) */}
          <div 
            className="prose prose-lg text-gray-600 leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
           {/* 'dangerouslySetInnerHTML' dipakai agar tag <p> di data dummy terbaca sebagai paragraf */}

        </div>

        {/* Tombol Kembali */}
        <div className="mt-12 text-center">
          <Link href="/berita" className="inline-flex items-center gap-2 text-green-600 font-medium hover:underline hover:bg-green-50 px-6 py-3 rounded-full transition">
            ← Kembali ke Daftar Berita
          </Link>
        </div>
      </article>
    </main>
  );
}