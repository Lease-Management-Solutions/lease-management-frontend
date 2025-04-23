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

  interface OwnerInfo {
    id_owner: string;
    percentage: number;
    startDate: Date;
    endDate?: Date | null; // Null quando ainda é proprietário
  }

  interface DataPropertyDocs {
    waterCode?: string;
    energyCode?: string;
    iptuCode?: string;
    registrationNumber?: string;
  }
  
  interface Attachment {
    type: "matricula" | "agua" | "energia" | "iptu"; // Define o tipo do anexo
    filePath: string; 
}

  interface PropertyContextProps {
    address: Address;
    setAddress: React.Dispatch<React.SetStateAction<Address>>;
    typeProperty: PropertyTypeEnum;
    setTypeProperty: React.Dispatch<React.SetStateAction<PropertyTypeEnum>>;
    ownerInfo: OwnerInfo[];
    setOwnerInfo: React.Dispatch<React.SetStateAction<OwnerInfo[]>>;
    dataPropertyDocs: DataPropertyDocs;
    setDataPropertyDocs: React.Dispatch<React.SetStateAction<DataPropertyDocs>>;
    attachment: Attachment[];
    setAttachment: React.Dispatch<React.SetStateAction<Attachment[]>>;
  }
  


interface PropertyProviderProps {
    children: React.ReactNode;
  }

const PropertyContext = createContext<PropertyContextProps | undefined>(undefined);
  

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [ownerInfo, setOwnerInfo] = useState<OwnerInfo[]>([]);
  const [typeProperty, setTypeProperty] = useState<PropertyTypeEnum>({
    type: 'casa'
  });
  const [dataPropertyDocs, setDataPropertyDocs] = useState<DataPropertyDocs>({
    waterCode: '',
    energyCode: '',
    iptuCode: '',
    registrationNumber: ''
  });
  const [attachment, setAttachment] = useState<Attachment[]>([]);
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
        ownerInfo, 
        setOwnerInfo, 
        dataPropertyDocs,
        setDataPropertyDocs,
        attachment,
        setAttachment,
         }}>
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