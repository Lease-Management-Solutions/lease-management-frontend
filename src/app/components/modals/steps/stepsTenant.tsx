import React from 'react';
import { StepConfig } from '../modalSteper';
import { DadosInquilino } from './componentsSteps/componentsTenants/componentsTenantsPag1';
import { EndereçoInquilino } from './componentsSteps/componentsTenants/componentsTenantsPag2';
import { MaritalNationalityStep } from './componentsSteps/componentsTenants/componentsTenantsPag3';
import { ContactStep } from './componentsSteps/componentsTenants/componentsTenantsPag4';

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
    title: 'Estado Civil',
    content: <MaritalNationalityStep/>,
  },
  { 
    title: 'Contato',
    content: <ContactStep/>,
  }
];

export default stepsTenant;