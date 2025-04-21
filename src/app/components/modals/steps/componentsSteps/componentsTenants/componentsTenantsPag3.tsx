'use client';

import React from 'react';
import { useTenantContext } from '@/app/contexts/TenantContext';

export const MaritalNationalityStep = () => {
  const {
    maritalStatus,
    setMaritalStatus,
    nationality,
    setNationality,
  } = useTenantContext();

  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full">
      <div className="w-full mt-10 flex flex-wrap gap-4">
        <label className="w-full md:w-6/12">
          Estado Civil
          <select
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value as typeof maritalStatus)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          >
            <option value="Single">Solteiro(a)</option>
            <option value="Married">Casado(a)</option>
            <option value="Divorced">Divorciado(a)</option>
            <option value="Widowed">Viúvo(a)</option>
            <option value="Legally Separated">Separado(a) Legalmente</option>
            <option value="Stable Union">União Estável</option>
          </select>
        </label>

        <label className="w-full md:w-6/12">
          Nacionalidade
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
          />
        </label>
      </div>
    </div>
  );
};
