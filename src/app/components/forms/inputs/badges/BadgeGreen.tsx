import React from "react";
import { BadgeProps } from "../../interfaces/badgeTypes";

const BadgeGreen: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-600 dark:text-green-300"
    >
      {children}
    </span>
  );
};

export default BadgeGreen;
