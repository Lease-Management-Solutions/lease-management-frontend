import React from 'react';
import { StepConfig } from '../modalSteper';
import ButtonGreen from '../../forms/inputs/buttons/ButtonGreen';
import { AddressProperty } from './componentsSteps/componentsProperties/componentsPropertiesPag1';

interface EscolhaProprietarioProps {
  setIsOwnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EscolhaProprietario: React.FC<EscolhaProprietarioProps> = ({ setIsOwnerModalOpen }) => {


  return (
    <div>
      <label>
        Proprietário:
        <input
          type="text"
          className="border p-2"
        />
      </label>
      <ButtonGreen onClick={() => setIsOwnerModalOpen(true)}>
        Novo Proprietário
      </ButtonGreen>
    </div>
  );
};

export const getStepsProperty = (setIsOwnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>): StepConfig[] => {
  
  return [
    {
      title: 'endereço',
      content: <AddressProperty/>,
    },
    {
      title: 'Escolha o proprietário',
      content: <EscolhaProprietario setIsOwnerModalOpen={setIsOwnerModalOpen} />,
    },
    {
      title: '3 page',
      content: <div>Conteúdo para nome do proprietario</div>,
    },
  ];
};

export default getStepsProperty;