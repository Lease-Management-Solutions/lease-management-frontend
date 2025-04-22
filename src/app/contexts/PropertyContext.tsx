import React, { createContext, useContext, useState } from 'react';

interface Address {
  street: string;
  number: string;
  additionalData?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
}

export interface PropertyTypeEnum {
  type:  "casa"
    | "apartamento"
    | "apartamento em condominio"
    | "casa comercial"
    | "casa em condominio"
    | "cobertura"
    | "chacara"
    | "edicula"
    | "fazenda"
    | "flat"
    | "galpão"
    | "garagem"
    | "hotel"
    | "kitnet"
    | "loft"
    | "prédio"
    | "ponto comercial"
    | "sala comercial"
    | "sitio"
    | "studio"
    | "terreno"
    | "consultorio"
  }

interface PropertyContextProps {
    address: Address;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
    typeProperty: PropertyTypeEnum;
    setTypeProperty: React.Dispatch<React.SetStateAction<PropertyTypeEnum>>;
    owners: string | null;
    setOwners: React.Dispatch<React.SetStateAction<string | null>>;
    dados: string | null;
    setDados: React.Dispatch<React.SetStateAction<string | null>>;}


interface PropertyProviderProps {
    children: React.ReactNode;
  }

const PropertyContext = createContext<PropertyContextProps | undefined>(undefined);
  

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [owners, setOwners] = useState<string | null>(null);
  const [dados, setDados] = useState<string | null>(null);
  const [typeProperty, setTypeProperty] = useState<PropertyTypeEnum>({
    type: 'casa'
  });
  const [address, setAddress] = useState<Address>({
    street: '',
    number: '',
    neighborhood: '',
    additionalData: '',
    city: '',
    state: '',
    country: '',
  });

  
  return (
    <PropertyContext.Provider 
      value={{ 
        address, 
        setAddress,
        typeProperty,
        setTypeProperty, 
        owners, 
        setOwners, 
        dados, 
        setDados }}>
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