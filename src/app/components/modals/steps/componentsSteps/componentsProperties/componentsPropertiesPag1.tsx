import React from 'react';
import { PropertyTypeEnum, usePropertyContext } from '@/app/contexts/PropertyContext';

export const AddressProperty = () => {
  const { address, setAddress } = usePropertyContext();
  const { typeProperty, setTypeProperty } = usePropertyContext();


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
        <label className="w-full md:w-5/12">
          País
          <input
            type="text"
            value={address.country}
            onChange={(e) => handleAddressChange('country', e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-4/12">
            Tipo de imóvel
            <select
                value={typeProperty.type}
                onChange={(e) => setTypeProperty({ type: e.target.value as PropertyTypeEnum['type'] })}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
            >
                <option value="">Selecione...</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="apartamento em condominio">Apartamento em Condomínio</option>
                <option value="casa comercial">Casa Comercial</option>
                <option value="casa em condominio">Casa em Condomínio</option>
                <option value="cobertura">Cobertura</option>
                <option value="chacara">Chácara</option>
                <option value="edicula">Edícula</option>
                <option value="fazenda">Fazenda</option>
                <option value="flat">Flat</option>
                <option value="galpão">Galpão</option>
                <option value="garagem">Garagem</option>
                <option value="hotel">Hotel</option>
                <option value="kitnet">Kitnet</option>
                <option value="loft">Loft</option>
                <option value="prédio">Prédio</option>
                <option value="ponto comercial">Ponto Comercial</option>
                <option value="sala comercial">Sala Comercial</option>
                <option value="sitio">Sítio</option>
                <option value="studio">Studio</option>
                <option value="terreno">Terreno</option>
                <option value="consultorio">Consultório</option>
            </select>
        </label>
      </div>
    </div>
  );
};