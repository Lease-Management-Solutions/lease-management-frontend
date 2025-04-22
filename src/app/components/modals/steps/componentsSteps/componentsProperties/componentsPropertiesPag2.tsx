import React, { useEffect, useState } from 'react';
import ButtonGreen from '@/app/components/forms/inputs/buttons/ButtonGreen';
import SelectBase from '@/app/components/forms/inputs/select/selectBase';
import { getCookie } from '@/app/helpers/cookieHelper';

interface PersonOption {
  id: string;
  name: string;
  cpf: string;
}

interface EscolhaProprietarioProps {
  setIsOwnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OwnerProperty: React.FC<EscolhaProprietarioProps> = ({ setIsOwnerModalOpen }) => {
  const [options, setOptions] = useState<PersonOption[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<string>('');
  const [selectedCPF, setSelectedCPF] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [extraOwners, setExtraOwners] = useState<{ id: string; cpf: string; percentage: string }[]>([]);
  const [shouldReloadOwners, setShouldReloadOwners] = useState(false);

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
    if (shouldReloadOwners) {
      fetchOwners();
      setShouldReloadOwners(false);
    }
  }, [shouldReloadOwners]);

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
    setTimeout(() => setShouldReloadOwners(true), 1000); // força reload após fechar o modal
  };

  const reloadOwners = () => {
    setShouldReloadOwners(true);
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
  <button
    type="button"
    onClick={reloadOwners}
    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
    title="Atualizar Lista de Proprietários"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12a7.5 7.5 0 1113.29 4.5M12 15v6m0 0l3-3m-3 3l-3-3"
      />
    </svg>
  </button>
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
