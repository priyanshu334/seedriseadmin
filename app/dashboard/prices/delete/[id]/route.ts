import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseserver";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  await supabaseServer.from("market_prices").delete().eq("id", id);

  return NextResponse.redirect("/dashboard/prices");
}
