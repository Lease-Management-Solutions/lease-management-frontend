import React from 'react';
import { useOwnerContext } from '@/app/contexts/OwnerContext';  



// ------------------------- PAG 1 ------------------------- 


export const NovoPorprietario = () => {
  const { endereco, setEndereco, nome, setNome, telefone, setTelefone } = useOwnerContext();


  
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
            value={nome || ''}
            onChange={(e) => setNome(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>
      <div className="flex items-center gap-2 w-full mt-10">
        <label>
          Telefone:
          <input
            type="text"
            value={telefone || ''}
            onChange={(e) => setTelefone(e.target.value)}
            className="border p-2"
          />
        </label>
      </div>
    </div>
  );
};