import { supabase } from "@/utils/supabase/client"
import { NextResponse } from "next/server"

export async function GET() {
    const categories = await supabase.from('categories').select();
    return NextResponse.json(categories)
}