'use client';

import { useEffect } from 'react';
import { useContractContext } from '@/app/contexts/ContractContext';
import { getCookie } from '@/app/helpers/cookieHelper';

interface ContractSaveHandlerProps {
  setSaveFunction: (fn: () => void) => void;
  onClose: () => void;
}

export const ContractSaveHandler = ({ setSaveFunction, onClose }: ContractSaveHandlerProps) => {
  const {
    selectedPropertyId,
    owners,
    leaseType,
    tenants,
    guarantees,
    contractStartDate,
    contractDuration,
    contractEndDate,
    initialRentValue,
    rentDueDay,
    keyDeliveryDate,
    adjustmentPeriod,
    adjustmentIndex,
    firstRentAtStart,
    penaltyExemption,
    lateFeeRate,
    penaltyRate,
    adminFee,
    guaranteedTransfer,
    fireInsurance,
    firstRentCommission,
  } = useContractContext();

  useEffect(() => {
    const handleSave = async () => {
      try {
        const token = getCookie('token');
        if (!token) throw new Error('Token não encontrado');

        const payloadToken = JSON.parse(atob(token.split('.')[1]));
        const userId = payloadToken.id;

        // Monta o payload com todos os dados do contexto
        const contractData = {
          id_imovel: selectedPropertyId,
          leaseType,
          owners,
          tenants: tenants.map((tenant) => ({
            id_locatario: tenant.id,
            startDate: tenant.startDate,
            endDate: tenant.endDate,
            percentage: tenant.percentage,
          })),
          guarantees: guarantees.map((guarantee) => ({
            id_garantia: guarantee.id,
            type: guarantee.type,
            startDate: guarantee.startDate,
            endDate: guarantee.endDate,
          })),
          contractStartDate,
          contractDuration,
          contractEndDate,
          initialRentValue,
          rentDueDay,
          keyDeliveryDate,
          adjustmentPeriod,
          adjustmentIndex,
          firstRentAtStart,
          penaltyExemption,
          lateFeeRate,
          penaltyRate,
          adminFee,
          guaranteedTransfer,
          fireInsurance: fireInsurance
            ? {
                id: fireInsurance.id,
                startDate: fireInsurance.startDate,
                endDate: fireInsurance.endDate,
              }
            : null,
          firstRentCommission,
          createdBy: userId,
          updatedBy: userId,
        };

        // Envia a requisição para o backend
        const res = await fetch('http://localhost:2000/contract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(contractData),
        });

        if (!res.ok) throw new Error('Erro ao salvar contrato');

        alert('Contrato salvo com sucesso!');
        onClose();
      } catch (err) {
        console.error(err);
        alert('Erro ao salvar dados do contrato.');
      }
    };

    setSaveFunction(() => handleSave);
  }, [
    selectedPropertyId,
    owners,
    leaseType,
    tenants,
    guarantees,
    contractStartDate,
    contractDuration,
    contractEndDate,
    initialRentValue,
    rentDueDay,
    keyDeliveryDate,
    adjustmentPeriod,
    adjustmentIndex,
    firstRentAtStart,
    penaltyExemption,
    lateFeeRate,
    penaltyRate,
    adminFee,
    guaranteedTransfer,
    fireInsurance,
    firstRentCommission,
    setSaveFunction,
  ]);

  return null;
};