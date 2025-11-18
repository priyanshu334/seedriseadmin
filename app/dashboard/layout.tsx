import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
