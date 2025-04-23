import React, { useEffect, useState } from 'react';
import ButtonGreen from '@/app/components/forms/inputs/buttons/ButtonGreen';
import SelectBase from '@/app/components/forms/inputs/select/selectBase';
import { getCookie } from '@/app/helpers/cookieHelper';
import { useContractContext } from '@/app/contexts/ContractContext';

interface PersonOption {
  id: string;
  name: string;
  cpf: string;
}

interface EscolhaInquilinoProps {
  setIsTenantModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TenantContract: React.FC<EscolhaInquilinoProps> = ({ setIsTenantModalOpen }) => {
  const { tenants, setTenants } = useContractContext();
  const [options, setOptions] = useState<PersonOption[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<string>(tenants[0]?.id || '');
  const [selectedCPF, setSelectedCPF] = useState<string>('');
  const [percentage, setPercentage] = useState<string>(tenants[0]?.percentage?.toString() || '');
  const [extraTenants, setExtraTenants] = useState<{ id: string; cpf: string; percentage: string }[]>(
    tenants.slice(1).map((tenant) => ({
      id: tenant.id,
      cpf: '',
      percentage: tenant.percentage.toString(),
    }))
  );

  const fetchTenants = async () => {
    const token = getCookie('token');
    try {
      const response = await fetch(`http://localhost:2000/person`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const tenantOptions = data.people.map((person: any) => ({
        id: person._id,
        name: person.name,
        cpf: person.cpf,
      }));
      setOptions(tenantOptions);
    } catch (error) {
      console.error('Erro ao buscar os inquilinos:', error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const reloadTenants = async () => {
    await fetchTenants(); // Chama diretamente a função de busca
  };

  useEffect(() => {
    // Atualiza o contexto sempre que os inquilinos ou percentuais mudarem
    const novosInquilinos = [
      {
        id: selectedTenant,
        percentage: parseFloat(percentage) || 0,
        startDate: new Date(),
        endDate: null,
      },
      ...extraTenants.map((tenant) => ({
        id: tenant.id,
        percentage: parseFloat(tenant.percentage) || 0,
        startDate: new Date(),
        endDate: null,
      })),
    ];
    setTenants(novosInquilinos);
  }, [selectedTenant, percentage, extraTenants, setTenants]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedTenant(selectedId);
    const person = options.find((p) => p.id === selectedId);
    if (person) {
      setSelectedCPF(person.cpf);
    }
  };

  const addTenantField = () => {
    setExtraTenants([...extraTenants, { id: '', cpf: '', percentage: '' }]);
  };

  const handleExtraChange = (index: number, field: 'id' | 'cpf' | 'percentage', value: string) => {
    const updated = [...extraTenants];
    if (field === 'id') {
      updated[index].id = value;
      const person = options.find((p) => p.id === value);
      updated[index].cpf = person?.cpf || '';
    } else {
      updated[index][field] = value;
    }
    setExtraTenants(updated);
  };

  const handleOpenModal = () => {
    setIsTenantModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full">
      <div className="w-full mt-10 flex gap-2 items-end">
        <div className="w-full flex gap-2 items-end">
          <div className="w-6/12">
            <SelectBase
              options={options.map(({ id, name }) => ({ id, address: name }))}
              onChange={handleChange}
              value={selectedTenant}
              className={['w-full', 'p-2.5', 'text-sm']}
            >
              Escolha o Inquilino
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
              onClick={reloadTenants}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
              title="Atualizar Lista de Inquilinos"
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
          {extraTenants.length === 0 && (
            <button
              type="button"
              onClick={addTenantField}
              className="text-green-600 text-sm mt-2 hover:underline"
            >
              + Inquilino
            </button>
          )}
        </div>
      )}

      {extraTenants.map((tenant, index) => (
        <div key={index} className="w-full mt-4 flex flex-wrap gap-4 items-start">
          <div className="flex w-full md:w-6/12 gap-2 items-end">
            <div className="w-9/12">
              <SelectBase
                options={options.map(({ id, name }) => ({ id, address: name }))}
                onChange={(e) => handleExtraChange(index, 'id', e.target.value)}
                value={tenant.id}
                className={['w-full', 'p-2.5', 'text-sm']}
              >
                Escolha o Inquilino
              </SelectBase>
            </div>
            <div className="w-3/12">
              <label className="block text-sm text-gray-700 mb-1">%</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
                value={tenant.percentage}
                onChange={(e) => handleExtraChange(index, 'percentage', e.target.value)}
              />
            </div>
          </div>
          {tenant.cpf && (
            <div className="w-full md:w-6/12 mt-1 text-sm text-gray-700 pl-1 self-start">
              <div>CPF: {tenant.cpf}</div>
              {index === extraTenants.length - 1 && (
                <button
                  type="button"
                  onClick={addTenantField}
                  className="text-green-600 text-sm mt-2 hover:underline"
                >
                  + Inquilino
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};