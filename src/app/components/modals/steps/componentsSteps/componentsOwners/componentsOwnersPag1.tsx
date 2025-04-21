import React from 'react';
import { useOwnerContext } from '@/app/contexts/OwnerContext';

export const DataOwners = () => {
  const {
    name,
    setName,
    cpf,
    setCpf,
    rg,
    setRg,
    issuingAuthority,
    setIssuingAuthority,
    rgIssuingState,
    setRgIssuingState
  } = useOwnerContext();
  
  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full">
      <div className="w-full mt-10 flex flex-wrap gap-4">
      <label className="w-48">
          CPF
          <input
            type="text"
            value={cpf || ''}
            onChange={(e) => setCpf(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full">
          Nome
          <input
            type="text"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
      <div className="w-full mt-3 flex gap-4">
      <label className="w-4/12">
          RG
          <input
            type="text"
            value={rg || ''}
            onChange={(e) => setRg(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-4/12">
          Orgão Emissor
          <input
            type="text"
            value={issuingAuthority || ''}
            onChange={(e) => setIssuingAuthority(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-4/12">
          Estado Emissor
          <input
            type="text"
            value={rgIssuingState || ''}
            onChange={(e) => setRgIssuingState(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
    </div>
  );
};