import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Kabar Desa - Desa Sangket",
  description: "Berita terbaru, pengumuman, dan agenda kegiatan Desa Sangket.",
};

export default function Berita() {
  // Data Dummy (Nanti bisa diganti database)
  const newsItems = [
    {
      id: 1,
      category: "Pemerintahan",
      date: "08 Des 2025",
      title: "Musyawarah Perencanaan Pembangunan Desa 2025",
      desc: "Pemdes mengundang seluruh elemen masyarakat untuk berpartisipasi dalam merancang masa depan desa...",
    },
    {
      id: 2,
      category: "Kesehatan",
      date: "06 Des 2025",
      title: "Jadwal Posyandu Balita & Lansia Bulan Desember",
      desc: "Cek jadwal lengkap kegiatan Posyandu di setiap dusun. Jangan lupa bawa buku KIA...",
    },
    {
      id: 3,
      category: "Ekonomi",
      date: "01 Des 2025",
      title: "Pelatihan Digital Marketing untuk UMKM Desa",
      desc: "Meningkatkan daya saing produk lokal kerajinan bambu melalui pemasaran digital...",
    },
    {
      id: 4,
      category: "Pembangunan",
      date: "28 Nov 2025",
      title: "Perbaikan Jalan Usaha Tani Dusun Kangin",
      desc: "Pengecoran jalan sepanjang 500m telah selesai dilaksanakan secara gotong royong...",
    },
    {
      id: 5,
      category: "Sosial",
      date: "25 Nov 2025",
      title: "Penyaluran BLT Dana Desa Tahap Akhir",
      desc: "Penyaluran bantuan langsung tunai berjalan lancar dan tepat sasaran di Balai Desa...",
    },
    {
      id: 6,
      category: "Adat",
      date: "20 Nov 2025",
      title: "Persiapan Upacara Piodalan Pura Desa",
      desc: "Masyarakat mulai melakukan ngayah mempersiapkan sarana upakara untuk piodalan...",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      
      {/* HEADER + SEARCH */}
      <section className="bg-green-600 pt-20 pb-24 px-6 text-center text-white relative overflow-hidden">
        {/* Hiasan Background (Opsional) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/pattern.png')]"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Kabar Desa</h1>
          <p className="text-green-100 mb-8">
            Informasi terkini seputar kegiatan dan perkembangan desa.
          </p>

          {/* Search Bar */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari berita..." 
              className="w-full py-4 px-6 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400 transition"
            />
            <button className="absolute right-2 top-2 bg-green-700 text-white p-2 rounded-full hover:bg-green-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* LIST BERITA */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <NewsCard key={item.id} data={item} />
          ))}
        </div>

        {/* Pagination (Tombol Halaman) */}
        <div className="mt-12 flex justify-center gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-600">Sebelumnya</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">1</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-600">2</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-600">3</button>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-600">Selanjutnya</button>
        </div>
      </section>
    </main>
  );
}

// Komponen Card Berita
function NewsCard({ data }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col h-full">
      {/* Gambar Dummy */}
      <div className="h-56 bg-gray-200 relative group">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          [Gambar Berita]
        </div>
        {/* Overlay Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-3 text-xs font-semibold">
          <span className="text-green-600 bg-green-50 px-2 py-1 rounded-md">{data.category}</span>
          <span className="text-gray-400">{data.date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug hover:text-green-600 transition cursor-pointer">
          <Link href={`/berita/${data.id}`}>{data.title}</Link>
        </h3>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
          {data.desc}
        </p>
        
        <Link href={`/berita/${data.id}`} className="text-green-600 font-semibold text-sm hover:underline inline-flex items-center gap-1 mt-auto">
          Baca Selengkapnya 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </div>
    </div>
  );
}