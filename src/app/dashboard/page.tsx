"use client";

import { useEffect, useState } from "react";
import { getCookie} from "../helpers/cookieHelper";

export default function Dashboard() {
  const [userData, setUserData] = useState<{ id: string; role: string } | null>(null);

  useEffect(() => {
    const token = getCookie("token"); 
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserData({ id: payload.id, role: payload.role });
    }
  }, []); 

  return (
    <div className="bg-gray-200 flex flex-col items-center justify-center flex-1">
      <h1 className="text-2xl font-bold text-black">Dashboard</h1>
      {userData && (
        <div className="mt-4 p-4 text-black bg-gray-100 rounded-lg">
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      )}
    </div>
  );
}
