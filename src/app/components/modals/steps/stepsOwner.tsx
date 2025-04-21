import React from 'react';
import { StepConfig } from '../modalSteper';
import { DataOwners } from './componentsSteps/componentsOwners/componentsOwnersPag1';
import { AddressOwner } from './componentsSteps/componentsOwners/componentsOwnersPag2';
import { MaritalNationalityOwner } from './componentsSteps/componentsOwners/componentsOwnersPag3';
import { ContactOwner } from './componentsSteps/componentsOwners/componentsOwnersPag4';


export const stepsOwner: StepConfig[] = [
  {
    title: 'Dados',
    content: <DataOwners/>,
  },
  {
    title: 'Endereço',
    content: <AddressOwner/>
  },
  {
    title: 'Estado Civil',
    content: <MaritalNationalityOwner/>
  },
  {
    title: 'Contato',
    content: <ContactOwner/>
  }
];

export default stepsOwner;