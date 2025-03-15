import React from "react";
import { BadgeProps } from "../../interfaces/badgeTypes";

const BadgeRed: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-600 dark:text-white"
    >
      {children}
    </span>
  );
};

export default BadgeRed;
