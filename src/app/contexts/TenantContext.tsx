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

export interface Phone {
  type: "mobile" | "home" | "work";
  number: string;
  startDate: Date;
  endDate?: Date | null;
}

export interface Email {
  type: "personal" | "work";
  email: string;
  startDate: Date;
  endDate?: Date | null;
}

interface Contact {
  phones?: Phone[];
  emails?: Email[];
}

interface TenantContextProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  cpf: string;
  setCpf: React.Dispatch<React.SetStateAction<string>>;
  rg: string;
  setRg: React.Dispatch<React.SetStateAction<string>>;
  issuingAuthority: string;
  setIssuingAuthority: React.Dispatch<React.SetStateAction<string>>;
  rgIssuingState: string;
  setRgIssuingState: React.Dispatch<React.SetStateAction<string>>;
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "Legally Separated" | "Stable Union";
  setMaritalStatus: React.Dispatch<
    React.SetStateAction<
      "Single" | "Married" | "Divorced" | "Widowed" | "Legally Separated" | "Stable Union"
    >
  >;
  nationality: string;
  setNationality: React.Dispatch<React.SetStateAction<string>>;
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
}

interface TenantProviderProps {
  children: React.ReactNode;
}

const TenantContext = createContext<TenantContextProps | undefined>(undefined);

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [rg, setRg] = useState<string>('');
  const [issuingAuthority, setIssuingAuthority] = useState<string>('');
  const [rgIssuingState, setRgIssuingState] = useState<string>('');
  const [address, setAddress] = useState<Address>({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    country: '',
  });
  const [maritalStatus, setMaritalStatus] = useState<
    "Single" | "Married" | "Divorced" | "Widowed" | "Legally Separated" | "Stable Union"
  >("Single");
  const [nationality, setNationality] = useState<string>('');

  const [contact, setContact] = useState<Contact>({
    phones: [],
    emails: [],
  });

  return (
    <TenantContext.Provider
      value={{
        name,
        setName,
        cpf,
        setCpf,
        rg,
        setRg,
        issuingAuthority,
        setIssuingAuthority,
        rgIssuingState,
        setRgIssuingState,
        address,
        setAddress,
        maritalStatus,
        setMaritalStatus,
        nationality,
        setNationality,
        contact,
        setContact,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenantContext = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenantContext must be used within a TenantProvider');
  }
  return context;
};
