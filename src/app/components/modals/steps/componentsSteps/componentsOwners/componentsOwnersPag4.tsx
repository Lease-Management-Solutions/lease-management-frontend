'use client';

import React from 'react';
import { useOwnerContext, Phone, Email } from '@/app/contexts/OwnerContext';

export const ContactOwner = () => {
  const { contact, setContact } = useOwnerContext();

  const handlePhoneChange = (index: number, field: keyof Phone, value: any) => {
    setContact((prev) => {
      const updatedPhones = [...(prev.phones || [])];
      updatedPhones[index] = { ...updatedPhones[index], [field]: value };
      return { ...prev, phones: updatedPhones };
    });
  };

  const addPhone = () => {
    setContact((prev) => ({
      ...prev,
      phones: [...(prev.phones || []), { type: 'mobile', number: '', startDate: new Date(), endDate: null }],
    }));
  };

  const handleEmailChange = (index: number, field: keyof Email, value: any) => {
    setContact((prev) => {
      const updatedEmails = [...(prev.emails || [])];
      updatedEmails[index] = { ...updatedEmails[index], [field]: value };
      return { ...prev, emails: updatedEmails };
    });
  };

  const addEmail = () => {
    setContact((prev) => ({
      ...prev,
      emails: [...(prev.emails || []), { type: 'personal', email: '', startDate: new Date(), endDate: null }],
    }));
  };

  return (
    <div className="flex flex-col gap-10 mt-8">
      {/* Telefones */}
      <div>
        <div className="text-black font-semibold mb-2">Telefones</div>
        {(contact.phones || []).map((phone, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/3 p-2.5"
              value={phone.type}
              onChange={(e) =>
                handlePhoneChange(index, 'type', e.target.value as 'mobile' | 'home' | 'work')
              }
            >
              <option value="mobile">Celular</option>
              <option value="home">Residencial</option>
              <option value="work">Trabalho</option>
            </select>
            <input
              type="text"
              placeholder="Número"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/3 p-2.5"
              value={phone.number}
              onChange={(e) => handlePhoneChange(index, 'number', e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addPhone}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          + Telefone
        </button>
      </div>

      {/* E-mails */}
      <div>
        <div className="text-black font-semibold mb-2">E-mails</div>
        {(contact.emails || []).map((email, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/3 p-2.5"
              value={email.type}
              onChange={(e) =>
                handleEmailChange(index, 'type', e.target.value as 'personal' | 'work')
              }
            >
              <option value="personal">Pessoal</option>
              <option value="work">Trabalho</option>
            </select>
            <input
              type="email"
              placeholder="E-mail"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-2/3 p-2.5"
              value={email.email}
              onChange={(e) => handleEmailChange(index, 'email', e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addEmail}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          + E-mail
        </button>
      </div>
    </div>
  );
};
