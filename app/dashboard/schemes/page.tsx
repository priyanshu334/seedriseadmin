import { supabase } from "@/lib/supabase";
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
  const { data: schemes } = await supabase.from("schemes").select("*");

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <Card className="border rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Schemes</CardTitle>

          <Button asChild className="rounded-xl">
            <Link href="/dashboard/schemes/new">+ Add Scheme</Link>
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {schemes?.map((s) => (
                <TableRow key={s.id} className="hover:bg-muted/30">
                  <TableCell>{s.title}</TableCell>
                  <TableCell>{s.state}</TableCell>
                  <TableCell>{s.language}</TableCell>

                  <TableCell className="text-right space-x-4">
                    <Link
                      href={`/dashboard/schemes/edit/${s.id}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <form
                      action={`/dashboard/schemes/delete/${s.id}`}
                      method="POST"
                      className="inline-block"
                    >
                      <button className="text-red-600 hover:underline text-sm">
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
                    className="text-center py-6 text-muted-foreground"
                  >
                    No schemes available. Add your first scheme!
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
