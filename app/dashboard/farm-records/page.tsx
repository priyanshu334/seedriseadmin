import { supabase } from "@/lib/supabase";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function FarmRecordsPage() {
  const { data: records } = await supabase.from("farm_records").select("*");

  console.log(records);
  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Farm Records</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Season</TableHead>
                <TableHead>Land Area</TableHead>
                <TableHead>Input Cost</TableHead>
                <TableHead>Yield (kg)</TableHead>
                <TableHead>Profit (₹)</TableHead>
                <TableHead>View</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {records?.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">
                    {r.users?.name || "Unknown"}
                  </TableCell>

                  <TableCell>{r.crops?.name}</TableCell>
                  <TableCell>{r.season}</TableCell>
                  <TableCell>{r.land_area} acres</TableCell>
                  <TableCell>₹{r.input_cost}</TableCell>
                  <TableCell>{r.yield}</TableCell>

                  <TableCell className="font-semibold text-green-600">
                    ₹{r.profit}
                  </TableCell>

                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/dashboard/farm-records/${r.id}`}>Details</a>
                    </Button>
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
