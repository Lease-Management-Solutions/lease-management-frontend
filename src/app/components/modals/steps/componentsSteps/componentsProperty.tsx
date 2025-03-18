import React from 'react';
import { usePropertyContext } from '@/app/contexts/PropertyContext'; 



// ------------------------- PAG 1 -------------------------


export const EnderecoNovoImovel = () => {
  const { endereco, setEndereco, owners, setOwners, dados, setDados } = usePropertyContext();


  
  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full">
      <div className="flex items-center gap-2 w-full mt-10">
        <label>
          Endereço:
          <input
            type="text"
            value={endereco || ''}
            onChange={(e) => setEndereco(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>
      <div className="flex items-center gap-2 w-full mt-10">
        <label>
          Proprietários:
          <input
            type="text"
            value={owners || ''}
            onChange={(e) => setOwners(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>
      <div className="flex items-center gap-2 w-full mt-10">
        <label>
          Dados:
          <input
            type="text"
            value={dados || ''}
            onChange={(e) => setDados(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>
    </div>
  );
};