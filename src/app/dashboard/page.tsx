"use client";

import { useEffect, useState } from "react";
import Topbar from "../components/topbar";
import SideBar from "../components/sideBar";
import SearchInput from "../components/searchInput";

export default function Dashboard() {
  const [userData, setUserData] = useState<{ id: string; role: string } | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica o JWT
      setUserData({ id: payload.id, role: payload.role });
    }
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar /> 
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="p-3 bg-gray-200 " >
          <SearchInput />
        </div>
          
        <div className=" bg-gray-200 flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          {userData && (
            <div className="mt-4 p-4 text-black bg-gray-100 rounded-lg">
              <p><strong>ID:</strong> {userData.id}</p>
              <p><strong>Role:</strong> {userData.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


