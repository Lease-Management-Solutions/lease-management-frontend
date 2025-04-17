import React from 'react';
import { StepConfig } from '../modalSteper';
import { DadosInquilino } from './componentsSteps/componentsTenants/componentsTenantsPag1';
import { EndereçoInquilino } from './componentsSteps/componentsTenants/componentsTenantsPag2';
import { ContatoInquilino } from './componentsSteps/componentsTenants/componentsTenantsPag3';

export const stepsTenant: StepConfig[] = [
  {
    title: 'Dados',
    content: <DadosInquilino/>,
  },
  {
    title: 'Endereço',
    content: <EndereçoInquilino/>,
  },
  { 
    title: 'Contato',
    content: <ContatoInquilino/>,
  },
];

export default stepsTenant;