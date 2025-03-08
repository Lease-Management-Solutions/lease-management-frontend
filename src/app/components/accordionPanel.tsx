import { useState } from "react";

interface AccordionPanelProps {
  title: string;
  children: React.ReactNode;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full mb-3 border rounded-md bg-gray-100">
      <div
        className="flex justify-between items-center p-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">{title}</span>
        <img
          src="https://img.icons8.com/ios-filled/24/000000/menu--v1.png"
          alt="Expandir"
        />
      </div>
      {isOpen && <div className="p-3 border-t bg-white">{children}</div>}
    </div>
  );
};

export default AccordionPanel;
