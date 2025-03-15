import React from "react";
import { BadgeProps } from "../../interfaces/badgeTypes";

const BadgePurple: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-600 dark:text-purple-300"
    >
      {children}
    </span>
  );
};

export default BadgePurple;
