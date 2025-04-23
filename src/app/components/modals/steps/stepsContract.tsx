import React from 'react';
import { StepConfig } from '../modalSteper';
import { EscolhaImovel } from './componentsSteps/componentsContracts/componentsContractsPag1';
import { TenantContract } from './componentsSteps/componentsContracts/componentsContractsPag2';



const getStepsContract = (setIsPropertyModalOpen: React.Dispatch<React.SetStateAction<boolean>>, setIsTenantModalOpen: React.Dispatch<React.SetStateAction<boolean>>): StepConfig[] => [
  {
    title: 'Escolha Imóvel',
    content: <EscolhaImovel setIsPropertyModalOpen={setIsPropertyModalOpen} />,
  },
  {
    title: 'Escolha Inquilino',
    content: <TenantContract setIsTenantModalOpen={setIsTenantModalOpen} />,
  },
  {
    title: 'Datas do Contrato',
    content: <div>Conteúdo para datas do contrato</div>,
  },
];

export default getStepsContract;