import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await supabase.from("buyers").delete().eq("id", id);

  return NextResponse.redirect("/dashboard/buyers");
}
