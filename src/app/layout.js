import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar"; // 1. Import Navbar

export const metadata = {
  title: "Desa Sangket",
  description: "Website Pemerintahan Desa Sangket yang Maju dan Transparan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar /> {/* 2. Pasang Navbar di sini */}
        
        {/* Konten halaman akan masuk ke sini */}
        {children} 
        
        <Footer /> {/* 3. Pasang Footer di sini */}
      </body>
    </html>
  );
}