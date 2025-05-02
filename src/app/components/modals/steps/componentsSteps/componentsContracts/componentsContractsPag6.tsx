import { GuaranteeTypeEnum, useContractContext } from "@/app/contexts/ContractContext";
import { useEffect } from "react";

export const GuaranteeContract = () => {
  const {
    guarantees,
    setGuarantees,
  } = useContractContext();

  const handleGuaranteeChange = (index: number, field: keyof typeof guarantees[0], value: any) => {
    const updatedGuarantees = [...guarantees];
    updatedGuarantees[index] = { ...updatedGuarantees[index], [field]: value };
    setGuarantees(updatedGuarantees); 
  };

  const handleNestedChange = (index: number, nestedField: "caucao" | "rentalInsurance", field: string, value: any) => {
    const updatedGuarantees = [...guarantees];
    const guarantee = updatedGuarantees[index];

    if (nestedField === "caucao") {
      guarantee.caucao = { ...guarantee.caucao, [field]: value };
    } else if (nestedField === "rentalInsurance") {
      guarantee.rentalInsurance = { ...guarantee.rentalInsurance, [field]: value };
    }

    updatedGuarantees[index] = guarantee;
    setGuarantees(updatedGuarantees);
  };

  useEffect(() => {
    console.log("Tipo de garantia alterado:", guarantees);
  }, [guarantees]);

  return (
    <div className="flex flex-col items-center gap-6 overflow-y-auto max-h-full">
      <h2 className="text-lg font-semibold">Garantias</h2>

      {guarantees.map((guarantee, index) => (
        <div key={index} className="w-full md:w-4/12 flex flex-col gap-4 border p-4 rounded-md bg-gray-50">
          <label>
            Tipo de Garantia 
            <select
              value={guarantee.type}
              onChange={(e) => handleGuaranteeChange(index, "type", e.target.value)}
              className="bg-white border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
            >
              <option value={GuaranteeTypeEnum.Caucao}>Caução</option>
              <option value={GuaranteeTypeEnum.SeguroFianca}>Seguro Fiança</option>
              <option value={GuaranteeTypeEnum.Fiador}>Fiador</option>
              <option value={GuaranteeTypeEnum.SemGarantia}>Sem Garantia</option>
            </select>
          </label>

          {/* Renderizar campos específicos */}
          {guarantee.type === GuaranteeTypeEnum.Caucao && (
            <>
              <label>
                Conta para Depósito
                <input
                  type="text"
                  className="bg-white border border-gray-300 text-sm text-gray-900 rounded-lg p-2.5 w-full;"
                  value={guarantee.caucao?.depositAccount || ""}
                  onChange={(e) => handleNestedChange(index, "caucao", "depositAccount", e.target.value)}
                />
              </label>
              <label>
                Valor Total da Caução
                <input
                  type="number"
                  className="bg-white border border-gray-300 text-sm text-gray-900 rounded-lg p-2.5 w-full;"
                  value={guarantee.caucao?.totalValue || ""}
                  onChange={(e) => handleNestedChange(index, "caucao", "totalValue", parseFloat(e.target.value))}
                />
              </label>
            </>
          )}

          {guarantee.type === GuaranteeTypeEnum.SeguroFianca && (
            <>
              <label>
                Valor da Parcela
                <input
                  type="number"
                  className="bg-white border border-gray-300 text-sm text-gray-900 rounded-lg p-2.5 w-full;"
                  value={guarantee.rentalInsurance?.installmentValue || ""}
                  onChange={(e) => handleNestedChange(index, "rentalInsurance", "installmentValue", parseFloat(e.target.value))}
                />
              </label>
              <label>
                Quantidade de Parcelas
                <input
                  type="number"
                  className="bg-white border border-gray-300 text-sm text-gray-900 rounded-lg p-2.5 w-full;"
                  value={guarantee.rentalInsurance?.installmentQty || ""}
                  onChange={(e) => handleNestedChange(index, "rentalInsurance", "installmentQty", parseInt(e.target.value))}
                />
              </label>
              <label>
                Número da Apólice
                <input
                  type="text"
                  className="bg-white border border-gray-300 text-sm text-gray-900 rounded-lg p-2.5 w-full;"
                  value={guarantee.rentalInsurance?.policyNumber || ""}
                  onChange={(e) => handleNestedChange(index, "rentalInsurance", "policyNumber", e.target.value)}
                />
              </label>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
