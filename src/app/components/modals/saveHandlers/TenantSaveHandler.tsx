// modals/saveHandlers/TenantSaveHandler.tsx
'use client';

import { useEffect } from 'react';
import { useTenantContext } from '@/app/contexts/TenantContext';
import { getCookie } from '@/app/helpers/cookieHelper';

interface TenantSaveHandlerProps {
  setSaveFunction: (fn: () => void) => void;
}

export const TenantSaveHandler = ({ setSaveFunction }: TenantSaveHandlerProps) => {
  const {
    name, cpf, rg, issuingAuthority, rgIssuingState,
    address, maritalStatus, nationality, contact,
  } = useTenantContext();

  useEffect(() => {
    const handleSave = async () => {
      try {
        const token = getCookie('token');
        if (!token) throw new Error('Token não encontrado');

        const payloadToken = JSON.parse(atob(token.split('.')[1]));
        const userId = payloadToken.id;

        const tenantData = {
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
          body: JSON.stringify(tenantData),
        });

        if (!res.ok) throw new Error('Erro ao salvar dados');

        alert('Inquilino salvo com sucesso!');
      } catch (err) {
        console.error(err);
        alert('Erro ao salvar dados do inquilino.');
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
