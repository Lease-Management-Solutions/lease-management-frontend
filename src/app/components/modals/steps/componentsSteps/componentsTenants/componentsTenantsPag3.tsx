import React from 'react';
import { useTenantContext, Phone, Email } from '@/app/contexts/TenantContext';

export const ContatoInquilino = () => {
  const {
    maritalStatus,
    setMaritalStatus,
    nationality,
    setNationality,
    contact,
    setContact,
  } = useTenantContext();

  const handlePhoneChange = (index: number, field: keyof Phone, value: string) => {
    setContact((prevContact) => {
      const updatedPhones = [...(prevContact.phones || [])]; // Fallback para array vazio
      updatedPhones[index] = { ...updatedPhones[index], [field]: value };
      return { ...prevContact, phones: updatedPhones };
    });
  };

  const handleEmailChange = (index: number, field: keyof Email, value: string) => {
    setContact((prevContact) => {
      const updatedEmails = [...(prevContact.emails || [])]; // Fallback para array vazio
      updatedEmails[index] = { ...updatedEmails[index], [field]: value };
      return { ...prevContact, emails: updatedEmails };
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 overflow-y-auto max-h-full">
      {/* Estado Civil */}
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

      {/* Telefones */}
      <div className="w-full mt-3 flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Telefones</h3>
        {(contact.phones || []).map((phone, index) => (
          <div key={index} className="flex flex-wrap gap-4">
            <label className="w-full md:w-4/12">
              Tipo
              <select
                value={phone.type}
                onChange={(e) => handlePhoneChange(index, 'type', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
              >
                <option value="mobile">Celular</option>
                <option value="home">Residencial</option>
                <option value="work">Trabalho</option>
              </select>
            </label>
            <label className="w-full md:w-4/12">
              Número
              <input
                type="text"
                value={phone.number}
                onChange={(e) => handlePhoneChange(index, 'number', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
              />
            </label>
            <label className="w-full md:w-4/12">
              Data de Início
              <input
                type="date"
                value={phone.startDate ? phone.startDate.toString().split('T')[0] : ''}
                onChange={(e) => handlePhoneChange(index, 'startDate', e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg text-sm p-2.5 w-full"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};