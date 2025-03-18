import React, { createContext, useContext, useState } from 'react';

interface OwnerContextProps {
  endereco: string | null;
  setEndereco: React.Dispatch<React.SetStateAction<string | null>>;
  nome: string | null;
  setNome: React.Dispatch<React.SetStateAction<string | null>>;
  telefone: string | null;
  setTelefone: React.Dispatch<React.SetStateAction<string | null>>;
}

interface OwnerProviderProps {
  children: React.ReactNode;
}

const OwnerContext = createContext<OwnerContextProps | undefined>(undefined);

 
export const OwnerProvider: React.FC<OwnerProviderProps> = ({ children }) => {

    const [endereco, setEndereco] = useState<string | null>(null);
    const [nome, setNome] = useState<string | null>(null);
    const [telefone, setTelefone] = useState<string | null>(null);

  return (
    <OwnerContext.Provider value={{ endereco, setEndereco, nome, setNome, telefone, setTelefone}}>
      {children}
    </OwnerContext.Provider>
  );
};

export const useOwnerContext = () => {
  const context = useContext(OwnerContext);
  if (!context) {
    throw new Error('useOwnerContext must be used within a OwnerProvider');
  }
  return context;
};