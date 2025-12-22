import { supabaseServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabaseServer
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
