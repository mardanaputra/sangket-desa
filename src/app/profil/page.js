import Image from "next/image";

export default function Profil() {
  return (
    <main className="bg-white min-h-screen pb-20">
      
      {/* HEADER JUDUL (Background Hijau) */}
      <section className="bg-green-600 py-16 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Profil Desa</h1>
        <p className="text-green-100 text-lg max-w-2xl mx-auto px-4">
          Mengenal lebih dekat sejarah, visi, dan semangat membangun Desa Sangket.
        </p>
      </section>

      {/* KONTEN UTAMA */}
      <div className="max-w-5xl mx-auto px-6 -mt-10">
        
        {/* KARTU SEJARAH (Floating Card) */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-4 border-green-500 inline-block pb-2">
            Sejarah Singkat
          </h2>
          <div className="prose text-gray-600 leading-relaxed space-y-4">
            <p>
              Desa Sangket memiliki sejarah panjang yang erat kaitannya dengan perjuangan masyarakat Buleleng. 
              Nama "Sangket" konon berasal dari kata "Sangketan" yang berarti tempat berkumpul atau bermusyawarah.
            </p>
            <p>
              Sejak didirikan pada tahun 19XX, desa ini terus bertransformasi menjadi desa yang mandiri dengan tetap 
              memegang teguh adat istiadat Bali yang luhur. Kini, Desa Sangket dikenal sebagai salah satu desa 
              dengan potensi pertanian dan kerajinan tangan yang berkembang pesat.
            </p>
          </div>
        </div>

        {/* VISI & MISI */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Visi */}
          <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
            <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
              🎯 Visi
            </h3>
            <p className="text-gray-700 font-medium italic">
              "Terwujudnya Desa Sangket yang Maju, Mandiri, Berbudaya, dan Sejahtera Berlandaskan Tri Hita Karana."
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              🚀 Misi
            </h3>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Meningkatkan kualitas pelayanan publik yang transparan.</li>
              <li>Mengembangkan potensi ekonomi lokal dan UMKM.</li>
              <li>Melestarikan seni dan budaya adat desa.</li>
              <li>Mewujudkan infrastruktur desa yang memadai.</li>
            </ul>
          </div>
        </div>

        {/* STRUKTUR ORGANISASI (Placeholder) */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Perangkat Desa
          </h2>
          {/* Grid Foto Perangkat Desa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProfileCard name="I Wayan Nama" role="Kepala Desa" />
            <ProfileCard name="Ni Kadek Sekretaris" role="Sekretaris Desa" />
            <ProfileCard name="I Putu Bendahara" role="Kaur Keuangan" />
          </div>
        </section>

      </div>
    </main>
  );
}

// Komponen Kecil untuk Kartu Foto (Supaya rapi)
function ProfileCard({ name, role }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400 text-xs overflow-hidden">
        [Foto]
      </div>
      <h4 className="font-bold text-gray-800">{name}</h4>
      <p className="text-green-600 text-sm">{role}</p>
    </div>
  );
}