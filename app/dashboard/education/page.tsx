import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function EducationPage() {
  const { data: items } = await supabase
    .from("education_content")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Education Content
          </CardTitle>

          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <a href="/dashboard/education/new">+ Add Content</a>
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items?.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-medium">{i.title}</TableCell>
                  <TableCell>
                    <Badge className="capitalize">{i.type}</Badge>
                  </TableCell>
                  <TableCell>{i.language}</TableCell>

                  <TableCell className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/dashboard/education/edit/${i.id}`}>Edit</a>
                    </Button>

                    <form
                      action={`/dashboard/education/delete/${i.id}`}
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
