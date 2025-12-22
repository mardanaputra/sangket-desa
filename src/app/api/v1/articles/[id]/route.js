import { supabaseServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_request, context) {
    // ✅ params adalah Promise di Next versi kamu
    const { id } = await context.params;

    if (!id) {
        return NextResponse.json({ message: "ID tidak terbaca" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
        .from("articles")
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
        .eq("id", id)
        .single();

    if (error || !data) {
        return NextResponse.json(
            { message: "Artikel tidak ditemukan", error: error?.message },
            { status: 404 }
        );
    }

    return NextResponse.json(data, { status: 200 });
}
