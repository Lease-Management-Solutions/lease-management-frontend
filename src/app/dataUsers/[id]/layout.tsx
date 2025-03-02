import { ReactNode } from "react";

export default function ContratosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="p-3 bg-gray-200">{children}</div>
    </div>
  );
}
