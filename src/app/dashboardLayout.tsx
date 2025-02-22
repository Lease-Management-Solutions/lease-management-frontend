"use client";

import { ReactNode } from "react";
import Topbar from "./components/topbar";
import SideBar from "./components/sideBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Topbar />
        <div className="flex-1 p-4">
          {/* Conteúdo da página será renderizado aqui */}
          {children}
        </div>
      </div>
    </div>
  );
}
