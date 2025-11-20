import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseserver";
import { supabase } from "@/lib/supabase";

export async function POST(
req: NextRequest,
context: { params: { id: string } }
) {
const { id } = context.params;

await supabase.from("schemes").delete().eq("id", id);

return NextResponse.redirect("/dashboard/schemes");
}
