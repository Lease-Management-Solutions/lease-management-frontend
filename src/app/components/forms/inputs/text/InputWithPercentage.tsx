interface InputWithPercentageProps {
    label: string;
    value: string;
    percentage: number;
  }
  
  const InputWithPercentage: React.FC<InputWithPercentageProps> = ({ label, value, percentage }) => {
    return (
      <div className="w-full flex gap-4">
        {/* Coluna 1 - Nome e Campo */}
        <div className="flex-1">
          <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </span>
            <input
              type="text"
              value={value}
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm p-2.5"
              readOnly
            />
          </div>
        </div>
  
        {/* Coluna 2 - Porcentagem */}
        <div className="w-20">
          <label className="block mb-1 text-sm font-medium text-gray-900">%</label>
          <input
            type="number"
            value={percentage}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full text-center"
            readOnly
          />
        </div>
      </div>
    );
  };
  
  export default InputWithPercentage;
  