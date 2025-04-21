import React from 'react';
import { useTenantContext } from '@/app/contexts/TenantContext';

export const EndereçoInquilino = () => {
  const { address, setAddress } = useTenantContext();

  const handleAddressChange = (field: keyof typeof address, value: string) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full">
      <div className="w-full mt-10 flex flex-wrap gap-4">
        <label className="w-full md:w-6/12">
          Rua
          <input
            type="text"
            value={address.street}
            onChange={(e) => handleAddressChange('street', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-3/12">
          Número
          <input
            type="text"
            value={address.number}
            onChange={(e) => handleAddressChange('number', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-6/12">
          Bairro
          <input
            type="text"
            value={address.neighborhood}
            onChange={(e) => handleAddressChange('neighborhood', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-3/12">
          Complemento
          <input
            type="text"
            value={address.additionalData}
            onChange={(e) => handleAddressChange('additionalData', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
      <div className="w-full mt-3 flex flex-wrap gap-4">
        <label className="w-full md:w-6/12">
          Cidade
          <input
            type="text"
            value={address.city}
            onChange={(e) => handleAddressChange('city', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-3/12">
          Estado
          <input
            type="text"
            value={address.state}
            onChange={(e) => handleAddressChange('state', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-4/12">
          País
          <input
            type="text"
            value={address.country}
            onChange={(e) => handleAddressChange('country', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
    </div>
  );
};