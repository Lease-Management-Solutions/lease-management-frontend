import React from "react";
import { ButtonProps } from "../../interfaces/buttonTypes";

const ButtonGreen: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
    >
      {children}
    </button>
  );
};

export default ButtonGreen;
