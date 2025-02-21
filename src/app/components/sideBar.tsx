import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const menuItems = [
  {
    title: "CONTRATOS",
    subItems: ["contratos1", "contratos2"],
  },
  {
    title: "RECEITAS",
    subItems: ["receitas1", "receitas2"],
  },
  {
    title: "DESPESAS",
    subItems: ["despesas1", "despesas2"],
  },
  {
    title: "FINANCEIRO",
    subItems: ["financeiro1", "financeiro2"],
  },
];

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav>
        <ul>
          {menuItems.map((menu) => (
            <li key={menu.title} className="mb-2">
              <button
                onClick={() => toggleMenu(menu.title)}
                className="flex justify-between w-full text-left px-4 py-2 rounded-md hover:bg-gray-600"
              >
                {menu.title}
                {openMenu === menu.title ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openMenu === menu.title && (
                <ul className="mt-1 ml-4 text-sm">
                  {menu.subItems.map((subItem) => (
                    <li key={subItem} className="px-4 py-2 hover:bg-gray-600 rounded-md">
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
