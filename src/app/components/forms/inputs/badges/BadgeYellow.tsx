import React from "react";
import { BadgeProps } from "../../interfaces/badgeTypes";

const BadgeYellow: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-600 dark:text-yellow-300"
    >
      {children}
    </span>
  );
};

export default BadgeYellow;
