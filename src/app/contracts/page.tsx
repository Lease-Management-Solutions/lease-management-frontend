"use client";

import { useState } from "react";
import SearchInput from "../components/searchInput";
import ButtonGreen from "../components/forms/inputs/buttons/ButtonGreen";
import { ContractProvider } from "../contexts/ContractContext";
import ModalStepper from "../components/modals/modalSteper";
import getStepsContract from "../components/modals/steps/stepsContract";
import { PropertyProvider } from "../contexts/PropertyContext";
import getStepsProperty from "../components/modals/steps/stepsProperty";
import { OwnerProvider } from "../contexts/OwnerContext";
import stepsOwner from "../components/modals/steps/stepsOwner";
import { TenantProvider } from "../contexts/TenantContext";
import stepsTenant from "../components/modals/steps/stepsTenant";
import { TenantSaveHandler } from '@/app/components/modals/saveHandlers/TenantSaveHandler';
import { OwnerSaveHandler } from "../components/modals/saveHandlers/OwnerSaveHandler";
import { PropertySaveHandler } from "../components/modals/saveHandlers/PropertySaveHandler";
import { ContractSaveHandler } from "../components/modals/saveHandlers/ContractSaveHandler";


export default function ContractsDashboard() {

    const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
    const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
    const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
    const [saveTenantFunction, setSaveTenantFunction] = useState<() => void>(() => () => {});
    const [saveOwnerFunction, setSaveOwnerFunction] = useState<() => void>(() => () => {});
    const [savePropertyFunction, setSavePropertyFunction] = useState<() => void>(() => () => {});
    const [saveContractFunction, setSaveContractFunction] = useState<() => void>(() => () => {});

  const [contracts, setContracts] = useState([
    {
      id: "123456",
      vencimento: "20/09/2024",
      imovel: "Rua ABC, 123, CEP: 12700-00",
      inquilino: "João Silva",
      proprietario: "José da Silva",
      valor: "R$ 1.500,00",
      taxaAdm: "R$ 150,00",
    },
    {
      id: "789123",
      vencimento: "30/09/2024",
      imovel: "Avenida Principal, 456",
      inquilino: "Maria Oliveira",
      proprietario: "João da Silva",
      valor: "R$ 2.000,00",
      taxaAdm: "R$ 200,00",
    },
  ]);
  

  return (


    <div className="p-4 space-y-6 text-black">
      {/* Barra de pesquisa e botão */}
      <div className="flex items-center gap-2">
      <ButtonGreen onClick={() => setIsContractModalOpen(true)}> 
        Novo Contrato
      </ButtonGreen>

        <SearchInput />
      </div>

      {/* Título */}
      <h1 className="text-xl font-bold text-center">CONTRATOS</h1>

      {/* Painéis de informações */}
      <div className="grid grid-cols-2 gap-4">
        <InfoPanel title="Receitas" data={[{ label: "Recebidas no Mês", value: 20 }, { label: "A Vencer no Mês", value: 40 }, { label: "Atrasadas no Mês", value: 10 }]} />
        <InfoPanel title="Despesas" data={[{ label: "Pagas no Mês", value: 20 }, { label: "Atrasadas no Mês", value: 5 }, { label: "Repasses", value: 5 }]} />
        <InfoPanel title="Status" data={[{ label: "Indeterminados", value: 5 }, { label: "Renovados", value: 3 }, { label: "Judicial", value: 1 }]} />
        <InfoPanel title="Conquistas" data={[{ label: "Conquistados Mês", value: 20 }, { label: "Encerrados no Mês", value: 5 }, { label: "Renovados no Mês", value: 3 }]} />
      </div>

      {/* Tabela de contratos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Lista de Contratos</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">✔</th>
                <th className="p-2 border">Vencimento</th>
                <th className="p-2 border">Contrato</th>
                <th className="p-2 border">Valor</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50">
                  <td className="p-2 border"><input type="checkbox" /></td>
                  <td className="p-2 border">{contract.vencimento}</td>
                  <td className="p-2 border">
                    <div>Contrato: {contract.id}</div>
                    <div>🏠 {contract.imovel}</div>
                    <div>👤 Inquilino: {contract.inquilino}</div>
                    <div>🔑 Proprietário: {contract.proprietario}</div>
                  </td>
                  <td className="p-2 border">
                    <div>{contract.valor}</div>
                    <div className="text-sm text-gray-600">Taxa de Adm: {contract.taxaAdm}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* modal de cadastro */}
      {isContractModalOpen && (
        <ContractProvider>
          <ContractSaveHandler
            setSaveFunction={setSaveContractFunction}
            onClose={() => setIsContractModalOpen(false)}
          />
          <ModalStepper
            isOpen={isContractModalOpen}
            onClose={() => setIsContractModalOpen(false)}
            steps={getStepsContract(setIsPropertyModalOpen, setIsTenantModalOpen)}
            onSave={saveContractFunction}
          />
        </ContractProvider>
      )}

      {isPropertyModalOpen && (
        <PropertyProvider>
          <PropertySaveHandler
            setSaveFunction={setSavePropertyFunction}
            onClose={() => setIsPropertyModalOpen(false)}
          />
          <ModalStepper
            isOpen={isPropertyModalOpen}
            onClose={() => setIsPropertyModalOpen(false)}
            steps={getStepsProperty(setIsOwnerModalOpen)}
            onSave={savePropertyFunction}
          />
        </PropertyProvider>
      )}

      {isOwnerModalOpen && (
        <OwnerProvider>
          <OwnerSaveHandler
            setSaveFunction={setSaveOwnerFunction}
            onClose={() => setIsOwnerModalOpen(false)}
          />
          <ModalStepper
            isOpen={isOwnerModalOpen}
            onClose={() => setIsOwnerModalOpen(false)}
            steps={stepsOwner}
            onSave={saveOwnerFunction}
          />
        </OwnerProvider>
      )}

      {isTenantModalOpen && (
        <TenantProvider>
          <TenantSaveHandler
            setSaveFunction={setSaveTenantFunction}
            onClose={() => setIsTenantModalOpen(false)}
          />
          <ModalStepper
            isOpen={isTenantModalOpen}
            onClose={() => setIsTenantModalOpen(false)}
            steps={stepsTenant}
            onSave={saveTenantFunction}
          />
        </TenantProvider>
      )}
    </div>
  );
}
  
// Componente para os painéis de informações
function InfoPanel({ title, data }: { title: string; data: { label: string; value: number }[] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h5 className="font-semibold mb-2">{title}</h5>
      <div className="grid grid-cols-3 gap-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center border-r last:border-0">
            <span className="text-lg font-bold">{item.value}</span>
            <span className="text-sm text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
