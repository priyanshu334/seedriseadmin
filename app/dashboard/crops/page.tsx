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

export default async function CropsPage() {
  const supabase = await supabaseServer();
  const { data: crops } = await supabase.from("crops").select("*");

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <Card className="border rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Crops</CardTitle>

          <Button asChild className="rounded-xl">
            <Link href="/dashboard/crops/new">+ Add Crop</Link>
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Seed Cost</TableHead>
                <TableHead className="text-left">Expected Yield</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {crops?.map((crop) => (
                <TableRow key={crop.id} className="hover:bg-muted/30">
                  <TableCell>{crop.name}</TableCell>
                  <TableCell>{crop.seed_cost}</TableCell>
                  <TableCell>{crop.expected_yield}</TableCell>

                  <TableCell className="text-right space-x-3">
                    <Link
                      href={`/dashboard/crops/edit/${crop.id}`}
                      className="text-blue-600 hover:underline text-sm"
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
                    className="text-center py-6 text-muted-foreground"
                  >
                    No crops found. Add your first crop!
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
