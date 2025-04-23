import React, { useEffect } from 'react';
import { useContractContext } from "@/app/contexts/ContractContext";

export const DateContrat = () => {
  const {
    contractStartDate,
    setContractStartDate,
    contractDuration,
    setContractDuration,
    contractEndDate,
    setContractEndDate,
    initialRentValue,
    setInitialRentValue,
    rentDueDay,
    setRentDueDay,
    keyDeliveryDate,
    setKeyDeliveryDate,
  } = useContractContext();

  // Atualiza a data de término do contrato automaticamente ao alterar a data de início ou a duração
  useEffect(() => {
    if (contractStartDate && contractDuration) {
      const startDate = new Date(contractStartDate);
      const endDate = new Date(startDate.setMonth(startDate.getMonth() + contractDuration)-1);
      setContractEndDate(endDate); // Define como objeto Date
    }
  }, [contractStartDate, contractDuration, setContractEndDate]);

  return (
    <div className="flex flex-col items-center gap-6 overflow-y-auto max-h-full">
      {/* Primeiro Bloco */}
      <div className="w-full flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Data de Início
          <input
            type="date"
            value={contractStartDate ? contractStartDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setContractStartDate(new Date(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-5/12">
          Duração (meses)
          <input
            type="number"
            value={contractDuration || ''}
            onChange={(e) => setContractDuration(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
      <div className="w-full flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Data de Término
          <input
            type="date"
            value={contractEndDate ? contractEndDate.toISOString().split('T')[0] : ''}
            readOnly
            className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>

      {/* Segundo Bloco */}
      <div className="w-full flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Valor Inicial do Aluguel
          <input
            type="number"
            value={initialRentValue || ''}
            onChange={(e) => setInitialRentValue(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-5/12">
          Dia de Vencimento
          <input
            type="number"
            value={rentDueDay || ''}
            onChange={(e) => setRentDueDay(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
      <div className="w-full flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Data de Entrega das Chaves
          <input
            type="date"
            value={keyDeliveryDate ? keyDeliveryDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setKeyDeliveryDate(new Date(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
    </div>
  );
};