"use client";

import { useEffect, useState } from "react";
import Topbar from "../components/topbar";

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
    <div> 
      <Topbar/>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {userData && (
          <div className="mt-4 p-4 text-black bg-gray-100 rounded-lg">
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}


