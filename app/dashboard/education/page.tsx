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
    <div className="p-6 space-y-6 bg-[#fafaf5] min-h-screen">
      <Card className="shadow-sm border border-green-200 bg-white rounded-lg">
        <CardHeader className="flex items-center justify-between border-b bg-green-50 rounded-t-lg p-4">
          <CardTitle className="text-2xl font-bold text-green-800">
            Education Content
          </CardTitle>

          <Button
            asChild
            className="bg-green-700 hover:bg-green-800 text-white rounded-md"
          >
            <a href="/dashboard/education/new">+ Add Content</a>
          </Button>
        </CardHeader>

        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-green-100 text-green-900">
                <TableHead className="font-bold">Title</TableHead>
                <TableHead className="font-bold">Type</TableHead>
                <TableHead className="font-bold">Language</TableHead>
                <TableHead className="font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items?.map((i) => (
                <TableRow
                  key={i.id}
                  className="hover:bg-green-50 transition-all"
                >
                  <TableCell className="font-medium text-green-900">
                    {i.title}
                  </TableCell>

                  <TableCell>
                    <Badge className="capitalize bg-green-600 text-white">
                      {i.type}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-green-700">{i.language}</TableCell>

                  <TableCell className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-green-600 text-green-700 hover:bg-green-100"
                    >
                      <a href={`/dashboard/education/edit/${i.id}`}>Edit</a>
                    </Button>

                    <form
                      action={`/dashboard/education/delete/${i.id}`}
                      method="POST"
                    >
                      <Button
                        variant="destructive"
                        size="sm"
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}

              {items?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-8"
                  >
                    No content added yet.
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
