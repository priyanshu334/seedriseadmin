import DeleteCropButton from "@/components/DeleteCropButton";
import { supabaseServer } from "@/lib/supabaseserver";
import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";

export default async function CropsPage() {
  const { data: crops } = await supabase.from("crops").select("*");

  return (
    <div className="p-6 max-w-9xl mx-auto">
      <Card className="border rounded-2xl shadow-lg bg-[#fffaf3] border-[#c7b18a]">
        <CardHeader className="flex flex-row items-center justify-between bg-[#f6e8cd] border-b border-[#d3c3a6] rounded-t-2xl p-6">
          <CardTitle className="text-3xl font-extrabold text-[#7a5a23] tracking-wide">
            🌾 My Crops
          </CardTitle>

          <Button
            asChild
            className="rounded-xl bg-[#8b5e2e] hover:bg-[#6c471f] text-white"
          >
            <Link href="/dashboard/crops/new">+ Add Crop</Link>
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#f9f1df] border-b border-[#d3c3a6]">
                <TableHead className="text-left font-semibold text-[#6b4a21]">
                  Crop
                </TableHead>
                <TableHead className="text-left font-semibold text-[#6b4a21]">
                  Seed Cost (₹)
                </TableHead>
                <TableHead className="text-left font-semibold text-[#6b4a21]">
                  Expected Yield
                </TableHead>
                <TableHead className="text-right font-semibold text-[#6b4a21]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {crops?.map((crop) => (
                <TableRow key={crop.id} className="hover:bg-[#fff2d9]">
                  <TableCell className="text-[#5a431d] font-medium">
                    {crop.name}
                  </TableCell>
                  <TableCell className="text-[#5a431d]">
                    ₹{crop.seed_cost}
                  </TableCell>
                  <TableCell className="text-[#5a431d]">
                    {crop.expected_yield}
                  </TableCell>

                  <TableCell className="text-right space-x-4">
                    <Link
                      href={`/dashboard/crops/edit/${crop.id}`}
                      className="text-[#855014] hover:underline text-sm font-semibold"
                    >
                      Edit
                    </Link>

                    <DeleteCropButton id={crop.id} />
                  </TableCell>
                </TableRow>
              ))}

              {!crops?.length && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-[#886b47] italic"
                  >
                    No crops added yet. 🌱 Start by adding your first crop!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
