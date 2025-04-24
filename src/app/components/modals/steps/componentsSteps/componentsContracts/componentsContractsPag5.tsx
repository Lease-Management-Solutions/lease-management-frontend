import { useContractContext } from "@/app/contexts/ContractContext";

export const BonusContract = () => {
  const {
    firstRentAtStart,
    setFirstRentAtStart,
    penaltyExemption,
    setPenaltyExemption,
    adminFee,
    setAdminFee,
    firstRentCommission,
    setFirstRentCommission,
  } = useContractContext();

  return (
    <div className="flex flex-col items-center gap-6 overflow-y-auto max-h-full">
      {/* Linha 1 */}
      <div className="w-full flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Primeiro aluguel no início?
          <select
            value={firstRentAtStart ? "true" : "false"}
            onChange={(e) => setFirstRentAtStart(e.target.value === "true")}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </label>

        <label className="w-full md:w-5/12">
          Isenção de Multa
          <div className="flex items-center gap-2">
            <select
              value={penaltyExemption.isExempt ? "true" : "false"}
              onChange={(e) =>
                setPenaltyExemption({
                  ...penaltyExemption,
                  isExempt: e.target.value === "true",
                })
              }
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-6/12"
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
            <input
              type="number"
              value={penaltyExemption.exemptionPeriodInMonths || ""}
              onChange={(e) =>
                setPenaltyExemption({
                  ...penaltyExemption,
                  exemptionPeriodInMonths: Number(e.target.value),
                })
              }
              placeholder="Meses"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-6/12"
              disabled={!penaltyExemption.isExempt}
            />
          </div>
        </label>
      </div>

      {/* Linha 2 */}
      <div className="w-full flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Taxa de Adm
          <input
            type="number"
            value={adminFee || ""}
            onChange={(e) => setAdminFee(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>

        <label className="w-full md:w-5/12">
          Comissão do Primeiro Aluguel
          <input
            type="number"
            value={firstRentCommission || ""}
            onChange={(e) => setFirstRentCommission(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
    </div>
  );
};