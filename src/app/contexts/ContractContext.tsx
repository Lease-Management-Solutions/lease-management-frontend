import React, { createContext, useContext, useState } from 'react';

interface Owner {
  id: string;
  name: string;
  percentage: number;
}

interface Tenants {
  id: string;
  percentage: number;
  startDate: Date;
  endDate?: Date | null;
}
 
interface ContractContextProps {
  selectedPropertyId: string | null;
  setSelectedPropertyId: React.Dispatch<React.SetStateAction<string | null>>;
  owners: Owner[];
  setOwners: React.Dispatch<React.SetStateAction<Owner[]>>;
  leaseType: string | null;
  setLeaseType: React.Dispatch<React.SetStateAction<string | null>>;
  tenants: Tenants[];
  setTenants: React.Dispatch<React.SetStateAction<Tenants[]>>;
}

interface ContractProviderProps {
    children: React.ReactNode;
  }

const ContractContext = createContext<ContractContextProps | undefined>(undefined);

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [leaseType, setLeaseType] = useState<string | null>(null);
  const [tenants, setTenants] = useState<Tenants[]>([]);

  return (
    <ContractContext.Provider 
      value={{ 
        selectedPropertyId, 
        setSelectedPropertyId, 
        owners, 
        setOwners, 
        leaseType, 
        setLeaseType,
        tenants, 
        setTenants 

      }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContractContext must be used within a ContractProvider');
  }
  return context;
};