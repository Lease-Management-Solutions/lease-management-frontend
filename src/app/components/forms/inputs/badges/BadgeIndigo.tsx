import React from "react";
import { BadgeProps } from "../../interfaces/badgeTypes";

const BadgeIndigo: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
    >
      {children}
    </span>
  );
};

export default BadgeIndigo;
