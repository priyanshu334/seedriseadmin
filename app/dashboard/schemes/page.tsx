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

export default async function SchemesPage() {
  const supabase = await supabaseServer();

  const { data: schemes } = await supabase.from("schemes").select("*");

  return (
    <div className="p-6 max-w-9xl mx-auto min-h-screen">
      <Card className="border rounded-2xl shadow-md bg-white">
        <CardHeader className="flex flex-row items-center justify-between bg-[#f0ead6] p-4 rounded-t-2xl border-b">
          <CardTitle className="text-3xl font-bold text-green-800">
            🌾 Government Schemes
          </CardTitle>

          <Button
            asChild
            className="rounded-xl bg-green-600 hover:bg-green-700 text-white shadow"
          >
            <Link href="/dashboard/schemes/new">+ Add Scheme</Link>
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#e8e2cd]">
                <TableHead className="font-semibold text-green-900">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-green-900">
                  State
                </TableHead>
                <TableHead className="font-semibold text-green-900">
                  Language
                </TableHead>
                <TableHead className="text-right font-semibold text-green-900">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {schemes?.map((s) => (
                <TableRow key={s.id} className="hover:bg-[#faf6e9] border-b">
                  <TableCell className="text-brown-800 font-medium">
                    {s.title}
                  </TableCell>
                  <TableCell className="text-green-800">{s.state}</TableCell>
                  <TableCell className="text-green-800">{s.language}</TableCell>

                  <TableCell className="text-right space-x-4">
                    <Link
                      href={`/dashboard/schemes/edit/${s.id}`}
                      className="text-blue-700 hover:underline text-sm"
                    >
                      Edit
                    </Link>

                    <form
                      action={`/dashboard/schemes/delete/${s.id}`}
                      method="POST"
                      className="inline-block"
                    >
                      <button className="text-red-700 hover:underline text-sm">
                        Delete
                      </button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}

              {!schemes?.length && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-gray-600"
                  >
                    No schemes found. Add your first one!
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
