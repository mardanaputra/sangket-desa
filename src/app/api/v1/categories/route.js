import { supabase } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")      // 🔥 ambil id + name saja
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  // ✅ kirim ARRAY langsung
  return NextResponse.json(data);
}
