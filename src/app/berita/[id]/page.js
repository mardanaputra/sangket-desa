import Link from "next/link";
import Image from "next/image"; 
import { notFound } from "next/navigation"; 

// Fungsi untuk mengambil data artikel dari API
async function getArticleData(id) {
  
  // Ambil URL langsung dari environment variable (paling aman untuk Server Component)
  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  
  try {
    const response = await fetch(`${BASE_API_URL}/articles/${id}`, {
      // Menggunakan cache: 'no-store' agar server selalu mengambil data terbaru 
      // saat halaman di-request ulang (berguna saat development)
      cache: 'no-store' 
    });

    if (response.status === 404) {
      return null; 
    }

    if (!response.ok) {
      console.error(`Gagal mengambil data dari API: Status ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function DetailBerita(props) {
  
  // 🛑 FIX UTAMA UNTUK MENGATASI ERROR RUNTIME:
  // Akses params.id secara langsung dari props untuk menghindari desctructuring 
  // yang bermasalah di Server Component Next.js/Turbopack.
  const id = props.params?.id;

  // 1. Jika ID tidak ada atau undefined, kembalikan 404
  if (!id) {
    notFound(); 
  }
  
  // 2. Ambil data berita dari API
  const data = await getArticleData(id);

  // 3. Jika data tidak ditemukan (misal API mengembalikan null atau 404)
  if (!data) {
    notFound(); // Menggunakan fungsi notFound() dari Next.js
  }
  
  // 4. Tampilkan Konten
  return (
    <main className="bg-white min-h-screen pb-20">
      
      {/* GAMBAR UTAMA (Hero Image) */}
      <div className="w-full h-[400px] bg-gray-200 relative">
        
        {/* Menggunakan data.image_url yang sudah diformat lengkap oleh Laravel */}
        {data.image_url ? (
            <Image 
                src={data.image_url} 
                alt={data.title || "Gambar Utama Berita"} 
                fill 
                sizes="100vw"
                className="object-cover"
                priority 
            />
        ) : (
             <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                [Gambar Utama Berita Tidak Tersedia]
            </div>
        )}
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
              {data.author || "Admin Desa"} 
            </div>
            <div>📅 {data.date}</div>
          </div>

          {/* Isi Berita (Render HTML) */}
          <div 
            className="prose prose-lg text-gray-600 leading-relaxed max-w-none"
            // Menggunakan data.content atau data.desc dari API Laravel
            dangerouslySetInnerHTML={{ __html: data.content || data.desc }} 
          />
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