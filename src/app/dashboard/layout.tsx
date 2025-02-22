// src/app/dashboard/layout.tsx
import { ReactNode } from "react";
import SideBar from "../components/sideBar";
import Topbar from "../components/topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="p-3 bg-gray-200">{children}</div>
      </div>
    </div>
  );
}
