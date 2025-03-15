import React from "react";
import { BadgeProps } from "../../interfaces/badgeTypes";

const BadgeDefault: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
    >
      {children}
    </span>
  );
};

export default BadgeDefault;
