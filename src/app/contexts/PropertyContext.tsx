import React, { createContext, useContext, useState } from 'react';

interface PropertyContextProps {
    endereco: string | null;
    setEndereco: React.Dispatch<React.SetStateAction<string | null>>;
    owners: string | null;
    setOwners: React.Dispatch<React.SetStateAction<string | null>>;
    dados: string | null;
    setDados: React.Dispatch<React.SetStateAction<string | null>>;}


interface PropertyProviderProps {
    children: React.ReactNode;
  }

const PropertyContext = createContext<PropertyContextProps | undefined>(undefined);
  

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [endereco, setEndereco] = useState<string | null>(null);
  const [owners, setOwners] = useState<string | null>(null);
  const [dados, setDados] = useState<string | null>(null);

  
  return (
    <PropertyContext.Provider value={{ endereco, setEndereco, owners, setOwners, dados, setDados }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};