import React, { createContext, useContext, useState } from 'react';

interface Owner {
  id: string;
  name: string;
  percentage: number;
}

interface Tenants {
  id: string;
  percentage: number;
  startDate: Date;
  endDate?: Date | null;
}

export interface Guarantee  {
  id: string;
  type: GuaranteeTypeEnum;
  startDate: Date;
  endDate?: Date | null;
}

interface PenaltyExemption {
  isExempt: boolean;
  exemptionPeriodInMonths: number;
}

interface GuaranteedTransfer {
  isGuaranteed: boolean;
  guaranteePeriodInMonths: number;
}

interface FireInsurance {
  id: string;
  startDate: Date;
  endDate?: Date | null;
}
export enum AdjustmentPeriodEnum {
  "12 meses" = "12 meses",
  "24 meses" = "24 meses",
  "36 meses" = "36 meses",
  "48 meses" = "48 meses",
  "sem reajuste" = "sem reajuste"
}

export enum AdjustmentIndexEnum {
  IGPM = "IGPM",
  INPC = "INPC",
  IPCA = "IPCA"
}

export enum GuaranteeTypeEnum {
  Caucao = "Caução",
  SeguroFianca = "Seguro fiança",
  Fiador = "Fiador",
  SemGarantia = "Sem garantia"
}

interface ContractContextProps {
  selectedPropertyId: string | null;
  setSelectedPropertyId: React.Dispatch<React.SetStateAction<string | null>>;
  owners: Owner[];
  setOwners: React.Dispatch<React.SetStateAction<Owner[]>>;
  leaseType: string | null;
  setLeaseType: React.Dispatch<React.SetStateAction<string | null>>;
  tenants: Tenants[];
  setTenants: React.Dispatch<React.SetStateAction<Tenants[]>>;
  guarantees: Guarantee[];
  setGuarantees: React.Dispatch<React.SetStateAction<Guarantee[]>>;
  contractStartDate: Date | null;
  setContractStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  contractDuration: number | null;
  setContractDuration: React.Dispatch<React.SetStateAction<number | null>>;
  contractEndDate: Date | null;
  setContractEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  initialRentValue: number | null;
  setInitialRentValue: React.Dispatch<React.SetStateAction<number | null>>;
  rentDueDay: number | null;
  setRentDueDay: React.Dispatch<React.SetStateAction<number | null>>;
  keyDeliveryDate: Date | null;
  setKeyDeliveryDate: React.Dispatch<React.SetStateAction<Date | null>>;
  adjustmentPeriod: AdjustmentPeriodEnum | null;
  setAdjustmentPeriod: React.Dispatch<React.SetStateAction<AdjustmentPeriodEnum | null>>;
  adjustmentIndex: AdjustmentIndexEnum | null;
  setAdjustmentIndex: React.Dispatch<React.SetStateAction<AdjustmentIndexEnum | null>>;
  firstRentAtStart: boolean;
  setFirstRentAtStart: React.Dispatch<React.SetStateAction<boolean>>;
  penaltyExemption: PenaltyExemption;
  setPenaltyExemption: React.Dispatch<React.SetStateAction<PenaltyExemption>>;
  lateFeeRate: number | null;
  setLateFeeRate: React.Dispatch<React.SetStateAction<number | null>>;
  penaltyRate: number | null;
  setPenaltyRate: React.Dispatch<React.SetStateAction<number | null>>;
  adminFee: number | null;
  setAdminFee: React.Dispatch<React.SetStateAction<number | null>>;
  guaranteedTransfer: GuaranteedTransfer;
  setGuaranteedTransfer: React.Dispatch<React.SetStateAction<GuaranteedTransfer>>;
  fireInsurance: FireInsurance | null;
  setFireInsurance: React.Dispatch<React.SetStateAction<FireInsurance | null>>;
  firstRentCommission: number | null;
  setFirstRentCommission: React.Dispatch<React.SetStateAction<number | null>>;
}

interface ContractProviderProps {
    children: React.ReactNode;
  }

const ContractContext = createContext<ContractContextProps | undefined>(undefined);

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [leaseType, setLeaseType] = useState<string | null>(null);
  const [tenants, setTenants] = useState<Tenants[]>([]);
  const [guarantees, setGuarantees] = useState<Guarantee[]>([]);
  const [contractStartDate, setContractStartDate] = useState<Date | null>(null);
  const [contractDuration, setContractDuration] = useState<number | null>(null);
  const [contractEndDate, setContractEndDate] = useState<Date | null>(null);
  const [initialRentValue, setInitialRentValue] = useState<number | null>(null);
  const [rentDueDay, setRentDueDay] = useState<number | null>(null);
  const [keyDeliveryDate, setKeyDeliveryDate] = useState<Date | null>(null);
  const [adjustmentPeriod, setAdjustmentPeriod] = useState<AdjustmentPeriodEnum | null>(null);
  const [adjustmentIndex, setAdjustmentIndex] = useState<AdjustmentIndexEnum | null>(null);
  const [firstRentAtStart, setFirstRentAtStart] = useState<boolean>(false);
  const [penaltyExemption, setPenaltyExemption] = useState<PenaltyExemption>({ isExempt: false, exemptionPeriodInMonths: 0 });
  const [lateFeeRate, setLateFeeRate] = useState<number | null>(null);
  const [penaltyRate, setPenaltyRate] = useState<number | null>(null);
  const [adminFee, setAdminFee] = useState<number | null>(null);
  const [guaranteedTransfer, setGuaranteedTransfer] = useState<GuaranteedTransfer>({ isGuaranteed: false, guaranteePeriodInMonths: 0 });
  const [fireInsurance, setFireInsurance] = useState<FireInsurance | null>(null);
  const [firstRentCommission, setFirstRentCommission] = useState<number | null>(null);

  return (
    <ContractContext.Provider 
      value={{ 
        selectedPropertyId, 
        setSelectedPropertyId, 
        owners, 
        setOwners, 
        leaseType, 
        setLeaseType,
        tenants, 
        setTenants,
        guarantees, 
        setGuarantees, 
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
        adjustmentPeriod,
        setAdjustmentPeriod,
        adjustmentIndex,
        setAdjustmentIndex,
        firstRentAtStart,
        setFirstRentAtStart,
        penaltyExemption,
        setPenaltyExemption,
        lateFeeRate,
        setLateFeeRate,
        penaltyRate,
        setPenaltyRate,
        adminFee,
        setAdminFee,
        guaranteedTransfer,
        setGuaranteedTransfer,
        fireInsurance,
        setFireInsurance,
        firstRentCommission,
        setFirstRentCommission,
      }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContractContext must be used within a ContractProvider');
  }
  return context;
};