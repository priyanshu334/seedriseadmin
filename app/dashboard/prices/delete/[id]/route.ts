import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
req: NextRequest,
{ params }: { params: { id: string } }
) {
const { id } = params;

await supabase.from("market_prices").delete().eq("id", id);

return NextResponse.redirect(new URL("/dashboard/prices", req.url));
}
