import React from "react";

interface DetailsProps {
  title: string;
  fields: { label: string; value: string }[];
}

const Details: React.FC<DetailsProps> = ({ title, fields }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <span className="font-semibold text-gray-700">{title}</span>
        <button className="text-blue-500 text-sm">Editar</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <input
            key={index}
            type="text"
            placeholder={field.label}
            value={field.value}
            className="p-2 border rounded w-full bg-gray-100"
            disabled
          />
        ))}
      </div>
    </div>
  );
};

export default Details;
