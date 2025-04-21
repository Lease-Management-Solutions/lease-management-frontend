'use client';

import { useEffect } from 'react';
import { useOwnerContext } from '@/app/contexts/OwnerContext';
import { getCookie } from '@/app/helpers/cookieHelper';

interface OwnerSaveHandlerProps {
  setSaveFunction: (fn: () => void) => void;
  onClose: () => void;
}

export const OwnerSaveHandler = ({ setSaveFunction, onClose }: OwnerSaveHandlerProps) => {
  const {
    name, cpf, rg, issuingAuthority, rgIssuingState,
    address, maritalStatus, nationality, contact,
  } = useOwnerContext();

  useEffect(() => {
    const handleSave = async () => {
      try {
        const token = getCookie('token');
        if (!token) throw new Error('Token não encontrado');

        const payloadToken = JSON.parse(atob(token.split('.')[1]));
        const userId = payloadToken.id;

        const ownerData = {
          name,
          cpf,
          rg,
          issuingAuthority,
          rgIssuingState,
          address,
          maritalStatus,
          nationality,
          contact,
          createdBy: userId,
          updatedBy: userId,
        };

        const res = await fetch('http://localhost:2000/person', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ownerData),
        });
        console.log('ownerData:', ownerData);
        if (!res.ok) throw new Error('Erro ao salvar dados');

        alert('Proprietário salvo com sucesso!');
        onClose();
      } catch (err) {
        console.error(err);
        alert('Erro ao salvar dados do proprietário.');
      }
    };

    setSaveFunction(() => handleSave);
  }, [
    name, cpf, rg, issuingAuthority, rgIssuingState,
    address, maritalStatus, nationality, contact,
    setSaveFunction,
  ]);

  return null;
};
