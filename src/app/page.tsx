"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ").find(row => row.startsWith("token="));
    const token = cookies ? cookies.split("=")[1] : null;

    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}
