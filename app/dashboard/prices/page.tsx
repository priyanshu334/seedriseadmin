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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function PricesPage() {
  const { data: prices } = await supabase
    .from("market_prices")
    .select("*, crops(name)");

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Market Prices</CardTitle>

          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="/dashboard/prices/new">+ Add Price</a>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Price (₹/kg)</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {prices?.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.crops?.name}</TableCell>
                  <TableCell>{p.location}</TableCell>
                  <TableCell className="font-semibold">₹{p.price}</TableCell>
                  <TableCell>{p.source}</TableCell>
                  <TableCell>{p.date}</TableCell>

                  <TableCell className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/dashboard/prices/edit/${p.id}`}>Edit</a>
                    </Button>

                    <form
                      action={`/dashboard/prices/delete/${p.id}`}
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
