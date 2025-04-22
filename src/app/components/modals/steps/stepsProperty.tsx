import React from 'react';
import { StepConfig } from '../modalSteper';
import { AddressProperty } from './componentsSteps/componentsProperties/componentsPropertiesPag1';
import { OwnerProperty } from './componentsSteps/componentsProperties/componentsPropertiesPag2';



export const getStepsProperty = (setIsOwnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>): StepConfig[] => {
  
  return [
    {
      title: 'endereço',
      content: <AddressProperty/>,
    },
    {
      title: 'Escolha o proprietário',
      content: <OwnerProperty setIsOwnerModalOpen={setIsOwnerModalOpen} />,
    },
    {
      title: '3 page',
      content: <div>Conteúdo para nome do proprietario</div>,
    },
  ];
};

export default getStepsProperty;