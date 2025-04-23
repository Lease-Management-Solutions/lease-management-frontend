import React from 'react';
import { StepConfig } from '../modalSteper';
import { AddressProperty } from './componentsSteps/componentsProperties/componentsPropertiesPag1';
import { OwnerProperty } from './componentsSteps/componentsProperties/componentsPropertiesPag2';
import { DataProperty } from './componentsSteps/componentsProperties/componentsPropertiesPag3';
import { DataCondominiumProperty } from './componentsSteps/componentsProperties/componentsPropertiesPag4';



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
      title: 'Dados do Imóvel',
      content: <DataProperty/>,
    },
    {
      title: 'Dados do condomínio',
      content: <DataCondominiumProperty/>,
    }
  ];
};

export default getStepsProperty;