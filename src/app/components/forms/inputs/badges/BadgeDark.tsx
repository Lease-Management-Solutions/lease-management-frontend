import React from "react";
import { BadgeProps } from "../../interfaces/badgeTypes";

const BadgeDark: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
    >
      {children}
    </span>
  );
};

export default BadgeDark;
