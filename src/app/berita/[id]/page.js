import { supabaseServer } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ArticleContent from "./articleContent";

// Helper untuk format tanggal (Jalan di Server)
const formatDateID = (dateString) => {
  if (!dateString) return "Tanggal tidak tersedia";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Makassar", // Opsional: Paksa zona waktu WITA agar konsisten
    }).format(date);
  } catch {
    return dateString;
  }
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: news } = await supabaseServer
    .from("articles")
    .select("title, content, image")
    .eq("id", id)
    .single();

  if (!news) return { title: "Berita Tidak Ditemukan" };

  const plainTextDescription = news.content
    ? news.content.replace(/<[^>]*>?/gm, "").substring(0, 160)
    : "Detail berita desa";

  return {
    title: news.title,
    description: plainTextDescription,
    openGraph: {
      title: news.title,
      description: plainTextDescription,
      images: [news.image],
    },
  };
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;

  // 1. Fetch Data
  const { data: news, error } = await supabaseServer
    .from("articles")
    .select(`
      *,
      categories (id, name)
    `)
    .eq("id", id)
    .single();

  const { data: categories } = await supabaseServer
    .from("categories")
    .select("*");

  if (error || !news) {
    notFound();
  }

  // 2. Format Tanggal DI SINI (Server Side)
  const formattedDate = formatDateID(news.created_at || news.date);

  // 3. Kirim formattedDate sebagai props
  return (
    <ArticleContent 
      news={news} 
      categories={categories || []} 
      formattedDate={formattedDate} 
    />
  );
}