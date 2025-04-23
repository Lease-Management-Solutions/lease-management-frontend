import React, { useEffect, useState } from 'react';
import ButtonGreen from '@/app/components/forms/inputs/buttons/ButtonGreen';
import SelectBase from '@/app/components/forms/inputs/select/selectBase';
import { getCookie } from '@/app/helpers/cookieHelper';
import { usePropertyContext } from '@/app/contexts/PropertyContext';

interface PersonOption {
  id: string;
  name: string;
  cpf: string;
}

interface EscolhaProprietarioProps {
  setIsOwnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OwnerProperty: React.FC<EscolhaProprietarioProps> = ({ setIsOwnerModalOpen }) => {
  const { ownerInfo, setOwnerInfo } = usePropertyContext();
  const [options, setOptions] = useState<PersonOption[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<string>(ownerInfo[0]?.id_owner || '');
  const [selectedCPF, setSelectedCPF] = useState<string>('');
  const [percentage, setPercentage] = useState<string>(ownerInfo[0]?.percentage?.toString() || '');
  const [extraOwners, setExtraOwners] = useState<{ id: string; cpf: string; percentage: string }[]>(
    ownerInfo.slice(1).map((owner) => ({
      id: owner.id_owner,
      cpf: '',
      percentage: owner.percentage.toString(),
    }))
  );

  const fetchOwners = async () => {
    const token = getCookie('token');
    try {
      const response = await fetch(`http://localhost:2000/person?role=proprietario`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const ownerOptions = data.people.map((person: any) => ({
        id: person._id,
        name: person.name,
        cpf: person.cpf,
      }));
      setOptions(ownerOptions);
    } catch (error) {
      console.error('Erro ao buscar os proprietários:', error);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  useEffect(() => {
    // Atualiza o contexto sempre que os proprietários ou percentuais mudarem
    const novosProprietarios = [
      {
        id_owner: selectedOwner,
        percentage: parseFloat(percentage) || 0,
        startDate: new Date(),
        endDate: null,
      },
      ...extraOwners.map((owner) => ({
        id_owner: owner.id,
        percentage: parseFloat(owner.percentage) || 0,
        startDate: new Date(),
        endDate: null,
      })),
    ];
    console.log('Proprietários atualizados:', novosProprietarios); // Adiciona o console.log aqui
    setOwnerInfo(novosProprietarios);
  }, [selectedOwner, percentage, extraOwners, setOwnerInfo]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedOwner(selectedId);
    const person = options.find((p) => p.id === selectedId);
    if (person) {
      setSelectedCPF(person.cpf);
    }
  };

  const addOwnerField = () => {
    setExtraOwners([...extraOwners, { id: '', cpf: '', percentage: '' }]);
  };

  const handleExtraChange = (index: number, field: 'id' | 'cpf' | 'percentage', value: string) => {
    const updated = [...extraOwners];
    if (field === 'id') {
      updated[index].id = value;
      const person = options.find((p) => p.id === value);
      updated[index].cpf = person?.cpf || '';
    } else {
      updated[index][field] = value;
    }
    setExtraOwners(updated);
  };

  const handleOpenModal = () => {
    setIsOwnerModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full">
      <div className="w-full mt-10 flex gap-2 items-end">
        <div className="w-full flex gap-2 items-end">
          <div className="w-6/12">
            <SelectBase
              options={options.map(({ id, name }) => ({ id, address: name }))}
              onChange={handleChange}
              value={selectedOwner}
              className={['w-full', 'p-2.5', 'text-sm']}
            >
              Escolha o Proprietário
            </SelectBase>
          </div>
          <div className="w-2/12">
            <label className="block text-sm text-gray-700 mb-1">%</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
          <div className="w-4/12 flex items-center gap-2">
            <ButtonGreen onClick={handleOpenModal}>+ Novo</ButtonGreen>
          </div>
        </div>
      </div>

      {selectedCPF && (
        <div className="w-full md:w-6/12 mt-1 text-sm text-gray-700 pl-1 self-start">
          <div>CPF: {selectedCPF}</div>
          {extraOwners.length === 0 && (
            <button
              type="button"
              onClick={addOwnerField}
              className="text-green-600 text-sm mt-2 hover:underline"
            >
              + Proprietário
            </button>
          )}
        </div>
      )}

      {extraOwners.map((owner, index) => (
        <div key={index} className="w-full mt-4 flex flex-wrap gap-4 items-start">
          <div className="flex w-full md:w-6/12 gap-2 items-end">
            <div className="w-9/12">
              <SelectBase
                options={options.map(({ id, name }) => ({ id, address: name }))}
                onChange={(e) => handleExtraChange(index, 'id', e.target.value)}
                value={owner.id}
                className={['w-full', 'p-2.5', 'text-sm']}
              >
                Escolha o Proprietário
              </SelectBase>
            </div>
            <div className="w-3/12">
              <label className="block text-sm text-gray-700 mb-1">%</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
                value={owner.percentage}
                onChange={(e) => handleExtraChange(index, 'percentage', e.target.value)}
              />
            </div>
          </div>
          {owner.cpf && (
            <div className="w-full md:w-6/12 mt-1 text-sm text-gray-700 pl-1 self-start">
              <div>CPF: {owner.cpf}</div>
              {index === extraOwners.length - 1 && (
                <button
                  type="button"
                  onClick={addOwnerField}
                  className="text-green-600 text-sm mt-2 hover:underline"
                >
                  + Proprietário
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};