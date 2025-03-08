"use client";

import { useState } from "react";
import SearchInput from "../components/searchInput";

export default function ContractsDashboard() {
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
      <div className="flex items-center gap-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
          Novo Contrato
        </button>

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
