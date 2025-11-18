import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function BuyersPage() {
  const { data: buyers } = await supabase
    .from("buyers")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Buyers & FPOs</CardTitle>

          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="/dashboard/buyers/new">+ Add Buyer / FPO</a>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Crop Needed</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {buyers?.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>{b.district}</TableCell>
                  <TableCell>{b.crop_needed}</TableCell>

                  <TableCell>
                    <Badge
                      variant={b.type === "buyer" ? "default" : "secondary"}
                      className="uppercase"
                    >
                      {b.type}
                    </Badge>
                  </TableCell>

                  <TableCell className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/dashboard/buyers/edit/${b.id}`}>Edit</a>
                    </Button>

                    <form
                      action={`/dashboard/buyers/delete/${b.id}`}
                      method="POST"
                    >
                      <Button variant="destructive" size="sm" type="submit">
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
