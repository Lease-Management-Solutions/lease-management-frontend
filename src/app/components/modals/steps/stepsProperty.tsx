import React from 'react';
import { StepConfig } from '../modalSteper';
import ButtonGreen from '../../forms/inputs/buttons/ButtonGreen';

interface EscolhaProprietarioProps {
  setIsOwnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EscolhaProprietario: React.FC<EscolhaProprietarioProps> = ({ setIsOwnerModalOpen }) => (
  <div>
    Conteúdo para escolha do imóvel
    <ButtonGreen onClick={() => setIsOwnerModalOpen(true)}>
      Novo Porprietário
    </ButtonGreen>
  </div>
);

export const getStepsProperty = (setIsOwnerModalOpen: React.Dispatch<React.SetStateAction<boolean>>): StepConfig[] => [
  {
    title: 'Endereço',
    content: <div>Conteúdo para endereço</div>,
  },
  {
    title: 'escolha o proprietário',
    content: <EscolhaProprietario setIsOwnerModalOpen={setIsOwnerModalOpen} />,
  },
  {
    title: 'Documentos',
    content: <div>Conteúdo para documentos</div>,
  },
];

export default getStepsProperty;