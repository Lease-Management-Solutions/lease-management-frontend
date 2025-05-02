'use client';

import { useEffect } from 'react';
import { GuaranteeTypeEnum, useContractContext } from '@/app/contexts/ContractContext';
import { getCookie } from '@/app/helpers/cookieHelper';

interface ContractSaveHandlerProps {
  setSaveFunction: (fn: () => void) => void;
  onClose: () => void;
}

export const ContractSaveHandler = ({ setSaveFunction, onClose }: ContractSaveHandlerProps) => {
  const {
    guarantees,
    setGuarantees,
    selectedPropertyId,
    leaseType,
    tenants,
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

        // Garantir ao menos uma garantia do tipo "Sem garantia"
        const guaranteesToSend = guarantees.length > 0 ? guarantees : [{
          type: GuaranteeTypeEnum.SemGarantia,
          startDate: contractStartDate ?? new Date(),
          endDate: contractEndDate ?? null,
        }];

        // Salvar garantias individualmente e obter os IDs
        const savedGuarantees = [];

        for (const guarantee of guaranteesToSend) {
          // Montar payload com base no tipo de garantia
          const payload: any = {
            type: guarantee.type, // Agora o valor corresponde ao GuaranteeTypeEnum atualizado
            startDate: guarantee.startDate,
            endDate: guarantee.endDate ?? null,
            contractId: null, // O contrato ainda não foi criado
          };
          
          // Adicionar campos específicos com base no tipo de garantia
          if (guarantee.type === GuaranteeTypeEnum.Fiador) {
            if (!guarantee.fiadores || guarantee.fiadores.length === 0) {
              throw new Error('É necessário informar pelo menos um fiador para o tipo Fiador.');
            }
            payload.fiadores = guarantee.fiadores;
          } else if (guarantee.type === GuaranteeTypeEnum.Caucao) {
            if (!guarantee.caucao || !guarantee.caucao.totalValue || !guarantee.caucao.depositAccount) {
              throw new Error('Dados de caução inválidos. Verifique totalValue e depositAccount.');
            }
            payload.caucao = guarantee.caucao;
          } else if (guarantee.type === GuaranteeTypeEnum.SeguroFianca) {
            if (!guarantee.rentalInsurance || !guarantee.rentalInsurance.installmentValue) {
              throw new Error('Dados de seguro fiança inválidos. Verifique installmentValue.');
            }
            payload.rentalInsurance = guarantee.rentalInsurance;
          }

          console.log('Payload enviado para /guarantee:', JSON.stringify(payload, null, 2));

          const res = await fetch('http://localhost:2000/guarantee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            console.error('Erro do backend:', errorResponse);
            throw new Error('Erro ao salvar garantia');
          }

          const saved = await res.json();
          savedGuarantees.push({
            ...guarantee,
            id: saved.garantee._id, // Substituir ID temporário pelo ObjectId retornado
          });
        }

        setGuarantees(savedGuarantees);

        // Montar payload do contrato
        const contractData = {
          id_imovel: selectedPropertyId,
          leaseType,
          tenants: tenants.map((tenant) => ({
            id_locatario: tenant.id,
            startDate: tenant.startDate,
            endDate: tenant.endDate,
            percentage: tenant.percentage,
          })),
          guarantees: savedGuarantees.map((guarantee) => ({
            _id: guarantee.id, // Agora é um ObjectId
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

        // Salvar contrato
        const contractResponse = await fetch('http://localhost:2000/contract', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(contractData),
        });

        if (!contractResponse.ok) throw new Error('Erro ao salvar contrato');

        alert('Contrato salvo com sucesso!');
        onClose();
      } catch (err) {
        console.error(err);
        alert('Erro ao salvar dados do contrato.');
      }
    };

    setSaveFunction(() => handleSave);
  }, [
    guarantees,
    setGuarantees,
    selectedPropertyId,
    leaseType,
    tenants,
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