import { supabase } from "@/utils/supabase/client"
import { NextResponse } from "next/server"

// Agar data selalu fresh
export const dynamic = 'force-dynamic'

// 1. GET: Ambil semua artikel
export async function GET() {
  // Perhatikan: Saya ubah 'image_url' jadi 'image' sesuai screenshot
  // Pastikan nama relasi 'categories' benar. Jika error, cek nama foreign key di Supabase.
  const { data, error } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      content,
      image,
      created_at,
      categories (
        id,
        name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Supabase Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}