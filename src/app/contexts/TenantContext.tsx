import React, { createContext, useContext, useState } from 'react';

interface TenantContextProps {
  endereco: string | null;
  setEndereco: React.Dispatch<React.SetStateAction<string | null>>;
  nome: string | null;
  setNome: React.Dispatch<React.SetStateAction<string | null>>;
  telefone: string | null;
  setTelefone: React.Dispatch<React.SetStateAction<string | null>>;
}


interface TenantProviderProps {
    children: React.ReactNode;
  }

const TenantContext = createContext<TenantContextProps | undefined>(undefined);

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
    const [endereco, setEndereco] = useState<string | null>(null);
    const [nome, setNome] = useState<string | null>(null);
    const [telefone, setTelefone] = useState<string | null>(null);

  return (
    <TenantContext.Provider value={{  endereco, setEndereco, nome, setNome, telefone, setTelefone }}>
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