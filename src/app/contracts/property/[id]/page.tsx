"use client";

import InfoBar from "@/app/components/infoBar";

export default function property() {
  return (
    <div className="bg-gray-100 text-black flex flex-col items-center justify-start flex-1 p-6">
      <InfoBar
        icon="https://img.icons8.com/ios-filled/50/ffffff/home.png"
        title="Endereço do imóvel"
        subtitle="Locado/Vazio"
      />


      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Container da esquerda */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Dados do Imóvel */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Dados do Imóvel</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <div className="space-y-4">
              {/* Endereço */}
              <div>
                <h5 className="font-semibold">Endereço</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <select className="p-2 border rounded w-full bg-gray-100" disabled>
                    <option>Selecione o tipo</option>
                    <option>Apartamento</option>
                    <option>Casa</option>
                    <option>Comercial</option>
                  </select>
                  <input type="text" placeholder="CEP" className="p-2 border rounded w-full bg-gray-100" disabled />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Rua" className="p-2 border rounded w-full bg-gray-100" disabled />
                <input type="text" placeholder="Número" className="p-2 border rounded w-full bg-gray-100" disabled />
                <input type="text" placeholder="Complemento" className="p-2 border rounded w-full bg-gray-100" disabled />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Bairro" className="p-2 border rounded w-full bg-gray-100" disabled />
                <input type="text" placeholder="Cidade" className="p-2 border rounded w-full bg-gray-100" disabled />
                <input type="text" placeholder="Estado" className="p-2 border rounded w-full bg-gray-100" disabled />
              </div>
            </div>
          </div>

          {/* Proprietário */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Proprietário</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nome do Proprietário" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="% de Propriedade" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
          </div>

          {/* Condomínio */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Condomínio</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Administradora" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Edifício" className="p-2 border rounded w-full bg-gray-100" disabled />
              <input type="text" placeholder="Valor" className="p-2 border rounded w-full bg-gray-100" disabled />
            </div>
          </div>
        </div>

        {/* Container da direita */}
        <div className="flex flex-col gap-4">
          {/* Prestação de Serviço */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <span className="font-semibold text-gray-700">Prestação de Serviço</span>
              <button className="text-blue-500 text-sm">Editar</button>
            </div>
            <div>
              <h5 className="font-semibold">Dados de Locação</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <input type="text" placeholder="ID Água" className="p-2 border rounded w-full bg-gray-100" disabled />
                <input type="text" placeholder="ID Luz" className="p-2 border rounded w-full bg-gray-100" disabled />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Inscrição Municipal" className="p-2 border rounded w-full bg-gray-100" disabled />
                <input type="text" placeholder="Matrícula" className="p-2 border rounded w-full bg-gray-100" disabled />
              </div>
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
