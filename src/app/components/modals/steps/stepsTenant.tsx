import React from 'react';
import { StepConfig } from '../modalSteper';
import {NovoInquilino} from '@/app/components/modals/steps/componentsSteps/componentsTenant';

export const stepsTenant: StepConfig[] = [
  {
    title: 'Nome',
    content: <NovoInquilino/>,
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

export default stepsTenant;