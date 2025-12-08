import Link from "next/link";

export const metadata = {
  title: "Layanan Surat - Desa Sangket",
  description: "Informasi persyaratan administrasi kependudukan dan layanan surat menyurat Desa Sangket.",
};

export default function Layanan() {
  const layananList = [
    {
      title: "Surat Keterangan Usaha",
      icon: "🏪",
      desc: "Untuk keperluan pengajuan KUR atau administrasi bank.",
      syarat: ["Fotocopy KTP & KK", "Foto lokasi usaha", "Lunas PBB tahun terakhir"]
    },
    {
      title: "Surat Keterangan Domisili",
      icon: "🏠",
      desc: "Keterangan tempat tinggal sementara atau pindahan.",
      syarat: ["Fotocopy KTP & KK", "Surat Pengantar RT/RW", "Pas foto 3x4 (2 lembar)"]
    },
    {
      title: "Surat Pengantar KTP / KK",
      icon: "🪪",
      desc: "Pembuatan baru, perubahan data, atau KTP hilang.",
      syarat: ["Fotocopy Akta Kelahiran/Ijazah", "Fotocopy KK Lama (jika ada)", "Surat Kehilangan (jika hilang)"]
    },
    {
      title: "Surat Keterangan Tidak Mampu",
      icon: "🤝",
      desc: "Untuk keperluan beasiswa sekolah atau bantuan kesehatan.",
      syarat: ["Fotocopy KTP & KK", "Surat Pengantar RT/RW", "Foto kondisi rumah (depan, samping, dalam)"]
    },
    {
      title: "Surat Keterangan Kelahiran",
      icon: "👶",
      desc: "Pengantar untuk pembuatan Akta Kelahiran.",
      syarat: ["Fotocopy KTP Orang Tua & Saksi", "Surat Keterangan Bidan/RS", "Fotocopy KK & Buku Nikah"]
    },
    {
      title: "Surat Kematian",
      icon: "🕊️",
      desc: "Pelaporan warga meninggal dunia untuk update KK.",
      syarat: ["Fotocopy KTP & KK Almarhum", "Surat Keterangan RS/Dokter", "Fotocopy KTP Pelapor"]
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      
      {/* HEADER */}
      <section className="bg-green-600 py-16 text-center text-white px-6">
        <h1 className="text-4xl font-bold mb-4">Layanan Administrasi Desa</h1>
        <p className="text-green-100 max-w-2xl mx-auto">
          Cek persyaratan surat menyurat di sini sebelum datang ke kantor desa agar pelayanan lebih cepat dan efisien.
        </p>
      </section>

      {/* KONTEN UTAMA */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">
        
        {/* Banner Info Jam Kerja */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10 border-l-4 border-yellow-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-800">⏰ Jam Pelayanan Kantor</h3>
            <p className="text-gray-600 text-sm">Senin - Kamis (08.00 - 15.00) | Jumat (08.00 - 13.00)</p>
          </div>
          <Link href="https://wa.me/6281234567890" target="_blank" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-bold text-sm transition flex items-center gap-2">
            <span>Chat WhatsApp Admin</span>
          </Link>
        </div>

        {/* Grid Layanan */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layananList.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-green-500 hover:shadow-lg transition group">
              <div className="text-4xl mb-4 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-green-50 transition">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="text-green-700 font-semibold text-xs uppercase mb-2">Persyaratan:</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  {item.syarat.map((syarat, i) => (
                    <li key={i}>{syarat}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}