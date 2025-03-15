import React from "react";
import { BadgeProps } from "../../interfaces/badgeTypes";

const BadgePink: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-600 dark:text-pink-300"
    >
      {children}
    </span>
  );
};

export default BadgePink;
