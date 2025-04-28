import { GuaranteeTypeEnum, useContractContext } from "@/app/contexts/ContractContext";
import { useEffect } from "react";

export const GuaranteeContract = () => {
  const {
    fireInsurance,
    setFireInsurance,
    guarantees,
    setGuarantees,
  } = useContractContext();

  const handleGuaranteeChange = (index: number, field: keyof typeof guarantees[0], value: any) => {
    const updatedGuarantees = [...guarantees];
    updatedGuarantees[index] = { ...updatedGuarantees[index], [field]: value };
    setGuarantees(updatedGuarantees);
  };

  useEffect(() => {
    // Este useEffect será executado sempre que o tipo de garantia for alterado
    console.log("Tipo de garantia alterado:", guarantees);
  }, [guarantees]);

  return (
    <div className="flex flex-col items-center gap-6 overflow-y-auto max-h-full">
      <h2 className="text-lg font-semibold">Garantias</h2>

      {guarantees.map((guarantee, index) => (
        <label key={index} className="w-full md:w-4/12">
          Tipo de Garantia 
          <select
            value={guarantee.type}
            onChange={(e) => handleGuaranteeChange(index, "type", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          >
            <option value={GuaranteeTypeEnum.Caucao}>Caução</option>
            <option value={GuaranteeTypeEnum.SeguroFianca}>Seguro Fiança</option>
            <option value={GuaranteeTypeEnum.Fiador}>Fiador</option>
            <option value={GuaranteeTypeEnum.SemGarantia}>Sem Garantia</option>
          </select>
        </label>
      ))}
    </div>
  );
};