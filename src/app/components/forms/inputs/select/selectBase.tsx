import React from "react";

interface SelectProps {
  children: React.ReactNode;
  options: { id: string; address: string }[];
  className?: [string, string, string]; // [largura, altura, tamanho da fonte]
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

const SelectBase: React.FC<SelectProps> = ({ children, options, className, onChange, value }) => {
  const [width, height, fontSize] = className || ["w-full", "p-2.5", "text-sm"];

  return (
    <form className={`mx-auto ${width}`}>
      <label className={`block mb-2 font-medium text-gray-900 ${fontSize}`}>
        {children}
      </label>
      <select
        className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block ${width} ${height} ${fontSize}`}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled>
          Selecione
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.address}
          </option>
        ))}
      </select>
    </form>
  );
};

export default SelectBase;