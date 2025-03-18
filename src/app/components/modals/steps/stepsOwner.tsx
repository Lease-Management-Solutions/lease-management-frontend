import React from 'react';
import { StepConfig } from '../modalSteper';
import {NovoPorprietario} from '@/app/components/modals/steps/componentsSteps/componentsOwner';

export const stepsOwner: StepConfig[] = [
  {
    title: 'Nome',
    content: <NovoPorprietario/>,
  },
  {
    title: 'Endereço',
    content: <div>Conteúdo para endereço</div>,
  },
  {
    title: 'Contato',
    content: <div>Conteúdo para contato</div>,
  },
];

export default stepsOwner;