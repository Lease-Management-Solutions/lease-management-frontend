import React from "react";
import { ButtonProps } from "../../interfaces/buttonTypes";

const ButtonPurple: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
    >
      {children}
    </button>
  );
};

export default ButtonPurple;
