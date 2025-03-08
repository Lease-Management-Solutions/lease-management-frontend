import React from 'react';

interface InfoBarProps {
  icon: string;
  title: string;
  subtitle: string;
  details?: React.ReactNode;
  actions?: React.ReactNode;
}

const InfoBar: React.FC<InfoBarProps> = ({ icon, title, subtitle, details, actions }) => {
  return (
    <div className="w-full flex items-center justify-between bg-gray-800 p-4 rounded-md mb-4">
      <div className="flex items-center space-x-4">
        <img src={icon} alt="Icon" className="w-12 h-12" />
        <div className="text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <h6 className="text-sm">{subtitle}</h6>
          {details && <div className="text-xs">{details}</div>}
        </div>
      </div>
      {actions && <div className="flex space-x-2">{actions}</div>}
    </div>
  );
};


export default InfoBar;
