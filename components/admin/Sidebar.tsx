"use client";

import {
  LayoutDashboard,
  Leaf,
  BookOpen,
  Store,
  Users,
  IndianRupee,
  BookMarked,
  Menu,
} from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Crops", href: "/dashboard/crops", icon: Leaf },
  { name: "Schemes", href: "/dashboard/schemes", icon: BookMarked },
  { name: "Market Prices", href: "/dashboard/prices", icon: IndianRupee },
  { name: "Buyers / FPOs", href: "/dashboard/buyers", icon: Store },
  { name: "Farm Records", href: "/dashboard/farm-records", icon: Users },
  { name: "Education", href: "/dashboard/education", icon: BookOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="p-4 md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu className="w-7 h-7" />
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <MobileSidebarContent
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-white border-r h-screen fixed left-0 top-0">
        <DesktopSidebarContent pathname={pathname} />
      </div>

      {/* Add left padding for desktop */}
      <div className="hidden md:block w-64" />
    </>
  );
}

/* Desktop Sidebar Content */
function DesktopSidebarContent({ pathname }: { pathname: string }) {
  return (
    <ScrollArea className="h-full p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition 
                ${active ? "bg-blue-600 text-white" : "hover:bg-gray-100"}
              `}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </ScrollArea>
  );
}

/* Mobile Slide-in Sidebar */
function MobileSidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <ScrollArea className="h-full p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 p-2 rounded-lg transition 
                ${active ? "bg-blue-600 text-white" : "hover:bg-gray-100"}
              `}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </ScrollArea>
  );
}
