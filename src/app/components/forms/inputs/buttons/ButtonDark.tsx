import React from "react";
import { ButtonProps } from "../../interfaces/buttonTypes";

const ButtonDark: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
    >
      {children}
    </button>
  );
};

export default ButtonDark;
