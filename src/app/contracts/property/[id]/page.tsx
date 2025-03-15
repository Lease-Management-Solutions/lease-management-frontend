'use client'

import { useEffect, useState } from "react";
import Details from "@/app/components/details";
import InfoBar from "@/app/components/infoBar";
import { getCookie } from "@/app/helpers/cookieHelper";

export default function PropertyPage() {
  const [property, setProperty] = useState<any>(null); // Estado para armazenar os dados da propriedade
  const [owners, setOwners] = useState<any[]>([]); // Estado para armazenar os dados dos proprietários

  useEffect(() => {
    const fetchPropertyData = async () => {
      const token = getCookie("token"); // Usando a função getCookie que já existe
      if (token) {
        const id = window.location.pathname.split("/").pop(); // Extrair o ID da URL

        try {
          const response = await fetch(`http://localhost:2000/property/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Passa o token no cabeçalho da requisição
            },
          });
          const data = await response.json();
          if (data.property) {
            setProperty(data.property); // Atualiza o estado com os dados da propriedade
          }

          // Filtra os proprietários com endDate null
          const ownerPromises = data.property?.owners
            ?.filter((owner: any) => owner.endDate === null) // Filtra apenas os proprietários com endDate null
            ?.map(async (owner: any) => {
              const ownerResponse = await fetch(`http://localhost:2000/person/${owner._id}`, {
                headers: {
                  Authorization: `Bearer ${token}`, // Passa o token para autenticação
                },
              });
              const ownerData = await ownerResponse.json();
              return ownerData.person; // Retorna os dados do proprietário
            });

          if (ownerPromises) {
            const ownersData = await Promise.all(ownerPromises);
            setOwners(ownersData); // Atualiza o estado com os dados dos proprietários
          }
        } catch (error) {
          console.error("Erro ao buscar os dados da propriedade:", error);
        }
      }
    };

    fetchPropertyData();
  }, []); // Executa apenas na primeira renderização

  if (!property || owners.length === 0) {
    return <div>Carregando...</div>; // Exibe "Carregando..." enquanto os dados não estiverem prontos
  }

  // Monta o título com o endereço completo
  const fullAddress = `${property.address?.street}, ${property.address?.number}, ${property.address?.neighborhood}, ${property.address?.city} - ${property.address?.state}`;

  // Verifica se existe algum contrato com endDate null para determinar o status (Locado ou Vazio)
  const isRented = property.contracts.some((contract: any) => contract.endDate === null);

  return (
    <div className="bg-gray-100 text-black flex flex-col items-center justify-start flex-1 p-6">
      <InfoBar
        icon="https://img.icons8.com/ios-filled/50/ffffff/home.png"
        title={fullAddress} // Passa o endereço completo como título
        subtitle={isRented ? "Locado" : "Vazio"} // Determina o status conforme a lógica
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Container da esquerda */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Endereço */}
          <Details
            title="Endereço"
            fields={[
              { label: "Tipo de Imóvel", value: property.type },
              { label: "CEP", value: property.address?.cep },
              { label: "Rua", value: property.address?.street },
              { label: "Número", value: property.address?.number },
              { label: "Complemento", value: property.address?.complement || "N/A" },
              { label: "Bairro", value: property.address?.neighborhood },
              { label: "Cidade", value: property.address?.city },
              { label: "Estado", value: property.address?.state },
            ]}
          />

          {/* Proprietários */}
          {owners.length > 0 && owners.map((owner: any, index: number) => (
            <div key={index}>
              <Details
                title={`Proprietário ${index + 1}`}
                fields={[
                  { label: "Nome", value: owner.name },
                  { label: "CPF", value: owner.cpf },
                  { label: "% de Propriedade", value: `${property.owners[index]?.percentage}%` }
                ]}
              />
            </div>
          ))}

          {/* Condomínio */}
          <Details
            title="Condomínio"
            fields={[
              { label: "Administradora", value: "Admin Exemplo" },
              { label: "Edifício", value: "Edifício Alpha" },
              { label: "Valor", value: "R$ 500,00" },
            ]}
          />
        </div>

        {/* Container da direita */}
        <div className="flex flex-col gap-4">
          {/* Dados de Locação */}
          <Details
            title="Dados de Locação"
            fields={[
              { label: "ID Água", value: property.waterCode },
              { label: "ID Luz", value: property.energyCode },
              { label: "Inscrição Municipal", value: property.iptuCode },
              { label: "Matrícula", value: property.registrationNumber },
            ]}
          />

          {/* Observação */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Observação</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <textarea
              className="p-2 border rounded w-full bg-gray-100"
              rows={4}
              placeholder="Nenhuma observação"
              disabled
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
