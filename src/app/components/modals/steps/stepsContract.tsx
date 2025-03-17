import React from 'react';
import { StepConfig } from '../modalSteper';
import ButtonGreen from "@/app/components/forms/inputs/buttons/ButtonGreen";
import { EscolhaImovel } from './componentsSteps/componentsContracts';

export interface EscolhaImovelProps {
  setIsPropertyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface EscolhaInquilinoProps {
  setIsTenantModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const EscolhaInquilino: React.FC<EscolhaInquilinoProps> = ({ setIsTenantModalOpen }) => (
  <div>
    Conteúdo para escolha do inquilino
    <ButtonGreen onClick={() => setIsTenantModalOpen(true)}>
      Novo Inquilino
    </ButtonGreen>
  </div>
);

const getStepsContract = (setIsPropertyModalOpen: React.Dispatch<React.SetStateAction<boolean>>, setIsTenantModalOpen: React.Dispatch<React.SetStateAction<boolean>>): StepConfig[] => [
  {
    title: 'Escolha Imóvel',
    content: <EscolhaImovel setIsPropertyModalOpen={setIsPropertyModalOpen} />,
  },
  {
    title: 'Escolha Inquilino',
    content: <EscolhaInquilino setIsTenantModalOpen={setIsTenantModalOpen} />,
  },
  {
    title: 'Datas do Contrato',
    content: <div>Conteúdo para datas do contrato</div>,
  },
];

export default getStepsContract;