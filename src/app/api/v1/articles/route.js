import { supabase } from "@/utils/supabase/client"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

// 1. GET: Ambil semua artikel + Info Kategori
export async function GET() {
  // Kita select semua kolom artikel (*), DAN nama dari tabel categories
  const { data, error } = await supabase
    .from('articles')
    .select('*, categories(name, id)') 
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}