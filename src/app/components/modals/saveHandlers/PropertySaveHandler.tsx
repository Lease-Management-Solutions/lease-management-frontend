'use client';

import { useEffect } from 'react';
import { usePropertyContext } from '@/app/contexts/PropertyContext';
import { getCookie } from '@/app/helpers/cookieHelper';

interface PropertySaveHandlerProps {
  setSaveFunction: (fn: () => void) => void;
  onClose: () => void;
}

export const PropertySaveHandler = ({ setSaveFunction, onClose }: PropertySaveHandlerProps) => {
  const {
    address, typeProperty, ownerInfo, dataPropertyDocs, attachment } = usePropertyContext();

  useEffect(() => {
    const handleSave = async () => {
      try {
        const token = getCookie('token');
        if (!token) throw new Error('Token não encontrado');

        const payloadToken = JSON.parse(atob(token.split('.')[1]));
        const userId = payloadToken.id;

        const propertyData = {
          address,
          type: typeProperty.type, // ← Aqui o erro: estava mandando objeto
          owners: ownerInfo.map(owner => ({
            _id: owner.id_owner, // ← Use _id, como no schema
            percentage: owner.percentage,
            startDate: owner.startDate ? new Date(owner.startDate).toISOString() : null,
            endDate: owner.endDate ? new Date(owner.endDate).toISOString() : null,
          })),
          waterCode: dataPropertyDocs.waterCode,
          energyCode: dataPropertyDocs.energyCode,
          iptuCode: dataPropertyDocs.iptuCode,
          registrationNumber: dataPropertyDocs.registrationNumber,
          attachments: attachment,
          createdBy: userId,
          updatedBy: userId,
        };
        
        
        
        

        const res = await fetch('http://localhost:2000/property', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(propertyData),
        });
        console.log('propertyData:', propertyData);
        if (!res.ok) throw new Error('Erro ao salvar dados');

        alert('Imóvel salvo com sucesso!');
        onClose();
      } catch (err) {
        console.error(err);
        alert('Erro ao salvar dados do imóvel.');
      }
    };

    setSaveFunction(() => handleSave);
  }, [
    address, typeProperty, ownerInfo, dataPropertyDocs, attachment,
    setSaveFunction,
  ]);

  return null;
};
