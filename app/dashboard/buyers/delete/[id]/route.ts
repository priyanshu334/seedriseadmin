import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseserver";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  await supabase.from("buyers").delete().eq("id", id);

  return NextResponse.redirect("/dashboard/buyers");
}
