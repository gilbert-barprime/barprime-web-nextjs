"use client";

import { GraduationCap, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "../Sidebar";
import { SidebarItem } from "../../../types";
import SidebarDrawer from "../../SideBarDrawer";
import { signOut } from "next-auth/react";

export default function DashboardLayout({
  children,
  sidebarItems,
}: Readonly<{
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sidebarItems={sidebarItems}
      />

      <main className="flex-1 overflow-y-auto lg:ml-0">
        {/* Header */}
        <div className="hidden lg:flex bg-white border-b border-gray-200 h-16 items-center justify-between sticky top-0 z-40">
          <div className="flex items-center space-x-2"></div>
          <div className="flex items-center gap-4">
            <SidebarDrawer />|
            <button
              className="btn btn-ghost btn-error cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-bold text-gray-900">BarPrime</span>
          </div>
          <div className="w-9"></div> {/* Spacer for centering */}
        </div>
        {children}
      </main>
    </div>
  );
}
