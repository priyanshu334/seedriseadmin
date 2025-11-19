import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Leaf,
  Phone,
  Calendar,
  Ruler,
  DollarSign,
  TrendingUp,
  Package,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FarmRecordDetails({ params }: Props) {
  const { id } = await params;

  const { data: record, error } = await supabase
    .from("farm_records")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !record) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Record Not Found</CardTitle>
            <CardDescription>
              The farm record youre looking for doesnt exist or has been
              removed.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const farmerName = record.users?.name ?? "Unknown Farmer";
  const farmerInitials = farmerName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Farm Record Details
            </h1>
            <p className="text-muted-foreground mt-1">
              Season: {record.season}
            </p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(record.created_at).toLocaleDateString("en-IN")}
          </Badge>
        </div>

        {/* Main Card */}
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-white/20">
                <AvatarFallback className="bg-white/20 text-white text-xl font-bold">
                  {farmerInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{farmerName}</CardTitle>
                <CardDescription className="text-white/90 flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4" />
                  {record.users?.phone ?? "No phone number"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-8">
            {/* Crop & Land Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Leaf className="w-6 h-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Crop</p>
                  <p className="text-xl font-semibold">
                    {record.crops?.name ?? "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Ruler className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Land Area</p>
                  <p className="text-xl font-semibold">
                    {record.land_area} acres
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Financial Summary */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Financial Summary
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Input Cost</p>
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{record.input_cost?.toLocaleString() ?? "0"}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Yield</p>
                    </div>
                    <p className="text-2xl font-bold">
                      {record.yield?.toLocaleString() ?? "0"} kg
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{record.revenue?.toLocaleString() ?? "0"}
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={
                    record.profit >= 0
                      ? "bg-green-50 border-green-300"
                      : "bg-red-50 border-red-300"
                  }
                >
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp
                        className={`w-5 h-5 ${
                          record.profit >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      />
                      <p className="text-sm text-muted-foreground">Profit</p>
                    </div>
                    <p
                      className={`text-2xl font-bold ${
                        record.profit >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ₹{record.profit?.toLocaleString() ?? "0"}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
