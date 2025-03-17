import React, { useEffect, useState } from 'react';
import SelectBase from "@/app/components/forms/inputs/select/selectBase";
import { EscolhaImovelProps } from "../stepsContract";
import ButtonGreen from "@/app/components/forms/inputs/buttons/ButtonGreen";
import { getCookie } from "@/app/helpers/cookieHelper";
import InputWithPercentage from "@/app/components/forms/inputs/text/InputWithPercentage";

interface PropertyOption {
  id: string;
  address: string;
}

interface Owner {
  id: string;
  name: string;
  percentage: number;
}

enum LeaseTypeEnum {
  Residencial = "Residencial",
  NaoResidencial = "Nao residencial",
  Comercial = "Comercial",
  Industrial = "Industrial",
  Temporada = "Temporada",
  Mista = "Mista",
  ArrendamentoRural = "Arrendamento Rural",
  ParceriaRural = "Parceria Rural",
}

export const EscolhaImovel: React.FC<EscolhaImovelProps> = ({ setIsPropertyModalOpen }) => {
  const [options, setOptions] = useState<PropertyOption[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [leaseType, setLeaseType] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = getCookie("token");
      try {
        const response = await fetch(`http://localhost:2000/property/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const propertyOptions = data.properties.map((property: any) => {
          const fullAddress = `${property.address.street}, ${property.address.number}, ${property.address.neighborhood}, ${property.address.city} - ${property.address.state}`;
          return { id: property._id, address: fullAddress };
        });
        setOptions(propertyOptions);
      } catch (error) {
        console.error("Erro ao buscar os imóveis:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPropertyId = event.target.value;
    setSelectedPropertyId(selectedPropertyId);

    console.log("Selected Property ID:", selectedPropertyId); // Adiciona o console.log para verificar o ID do imóvel

    const token = getCookie("token");
    try {
      const response = await fetch(`http://localhost:2000/property/${selectedPropertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const activeOwners = data.property.owners.filter((owner: any) => owner.endDate === null);

      const ownerPromises = activeOwners.map(async (owner: any) => {
        const ownerResponse = await fetch(`http://localhost:2000/person/${owner._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ownerData = await ownerResponse.json();
        return {
          id: owner._id,
          name: ownerData.person.name,
          percentage: owner.percentage,
        };
      });

      const ownersData = await Promise.all(ownerPromises);
      setOwners(ownersData);
    } catch (error) {
      console.error("Erro ao buscar os proprietários:", error);
    }
  };
  const handleLeaseTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLeaseType(event.target.value);
  };

  const leaseTypeOptions = Object.values(LeaseTypeEnum).map((type) => ({
    id: type,
    address: type,
  }));
  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full"> 
      <div className="flex items-center gap-2 w-full mt-10">
        <SelectBase options={options} className={["w-full", "p-2.5", "text-sm"]} onChange={handleSelectChange}>
          Escolha o imóvel
        </SelectBase>
        <div className="self-end">
          <ButtonGreen onClick={() => setIsPropertyModalOpen(true)}>
            +Imóvel
          </ButtonGreen>
        </div>
      </div>
      {owners.length > 0 && owners.map((owner, index) => (
        <div key={owner.id} className="flex items-center gap-2 w-full mt-4">
          <InputWithPercentage label={`Proprietário ${index + 1}`} value={owner.name} percentage={owner.percentage} />
        </div>
      ))}
      <div className="flex items-center gap-2 w-full mt-10">
        <SelectBase options={leaseTypeOptions} className={["w-full", "p-2.5", "text-sm"]} onChange={handleLeaseTypeChange}>
          Escolha o tipo de contrato
        </SelectBase>
      </div>
    </div>
  );
};