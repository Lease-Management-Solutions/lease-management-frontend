import { AdjustmentIndexEnum, AdjustmentPeriodEnum, useContractContext } from "@/app/contexts/ContractContext";

export const IndexContract = () => {
  const {
    adjustmentPeriod, 
    setAdjustmentPeriod,
    adjustmentIndex, 
    setAdjustmentIndex,
    lateFeeRate, 
    setLateFeeRate,
    penaltyRate, 
    setPenaltyRate,
    guaranteedTransfer, 
    setGuaranteedTransfer
  } = useContractContext();



  return (
    <div className="flex flex-col items-center gap-6 overflow-y-auto max-h-full">
      {/* Linha 1 */}
      <div className="w-full flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Período de Reajuste
          <select
            value={adjustmentPeriod || ""}
            onChange={(e) => setAdjustmentPeriod(e.target.value as AdjustmentPeriodEnum)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          >
            <option value="" disabled>Selecione um período</option>
            <option value={AdjustmentPeriodEnum["12 meses"]}>{AdjustmentPeriodEnum["12 meses"]}</option>
            <option value={AdjustmentPeriodEnum["24 meses"]}>{AdjustmentPeriodEnum["24 meses"]}</option>
            <option value={AdjustmentPeriodEnum["36 meses"]}>{AdjustmentPeriodEnum["36 meses"]}</option>
            <option value={AdjustmentPeriodEnum["48 meses"]}>{AdjustmentPeriodEnum["48 meses"]}</option>
            <option value={AdjustmentPeriodEnum["sem reajuste"]}>{AdjustmentPeriodEnum["sem reajuste"]}</option>
          </select>
        </label>
        <label className="w-full md:w-5/12">
  Índice de Reajuste
  <select
    value={adjustmentIndex || ""}
    onChange={(e) => setAdjustmentIndex(e.target.value as AdjustmentIndexEnum)}
    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
  >
    <option value="" disabled>Selecione um índice</option>
    <option value={AdjustmentIndexEnum.IGPM}>{AdjustmentIndexEnum.IGPM}</option>
    <option value={AdjustmentIndexEnum.INPC}>{AdjustmentIndexEnum.INPC}</option>
    <option value={AdjustmentIndexEnum.IPCA}>{AdjustmentIndexEnum.IPCA}</option>
  </select>
</label>
      </div>

      {/* Linha 2 */}
      <div className="w-full flex flex-wrap gap-4">
      <label className="w-full md:w-5/12">
          Juros por Atraso (a.m)
          <input
            type="number"
            value={lateFeeRate || ""}
            onChange={(e) => setLateFeeRate(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
        <label className="w-full md:w-5/12">
          Multa por Atraso (a.m.)
          <input
            type="number"
            value={penaltyRate || ""}
            onChange={(e) => setPenaltyRate(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>

      {/* Linha 3 */}
      <div className="w-full flex flex-wrap gap-4">
        <label className="w-full md:w-5/12">
          Repasse Garantido
          <select
            value={guaranteedTransfer.isGuaranteed ? "true" : "false"}
            onChange={(e) =>
              setGuaranteedTransfer({
                ...guaranteedTransfer,
                isGuaranteed: e.target.value === "true",
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
        </label>
        <label className="w-full md:w-5/12">
          Período de Garantia (meses)
          <input
            type="number"
            value={guaranteedTransfer.guaranteePeriodInMonths || ""}
            onChange={(e) =>
              setGuaranteedTransfer({
                ...guaranteedTransfer,
                guaranteePeriodInMonths: Number(e.target.value),
              })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
    </div>
  );
};