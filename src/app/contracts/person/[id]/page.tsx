"use client";

import InfoBar from "@/app/components/infoBar";

export default function Person() {
  return (
    <div className="bg-gray-100 text-black flex flex-col items-center justify-start flex-1 p-6">
      {/* Barra com informações da pessoa */}
      <InfoBar
        icon="https://img.icons8.com/ios-filled/50/ffffff/user.png"
        title="Nome da Pessoa"
        subtitle="Locador/Locatário"
      />


      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Container da esquerda */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Dados Pessoais */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Dados Pessoais</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nome Completo" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="CPF/CNPJ" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input type="text" placeholder="RG/Inscrição Estadual" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Data de Nascimento" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
          </div>

          {/* Contato */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Contato</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="E-mail" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Telefone" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Endereço</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="CEP" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Rua" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Número" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <input type="text" placeholder="Complemento" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Bairro" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Cidade" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
          </div>
        </div>

        {/* Container da direita */}
        <div className="flex flex-col gap-4">
          {/* Dados Bancários */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Dados Bancários</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Banco" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Agência" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <input type="text" placeholder="Conta" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Tipo de Conta" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
          </div>

          {/* Observação */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Observação</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <textarea className="p-2 border rounded w-full bg-gray-100" rows={4} placeholder="Nenhuma observação" disabled></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
