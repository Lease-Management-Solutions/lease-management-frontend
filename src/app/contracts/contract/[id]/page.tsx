"use client";

import InfoBar from "@/app/components/infoBar";
import AccordionPanel from "@/app/components/accordionPanel";

export default function Contract() {
  return (
    <div className="bg-gray-100 text-black flex flex-col items-center flex-1 p-4">
      {/* InfoBar agora ocupa toda a largura */}
      <div className="w-full">
        <InfoBar
          icon="https://img.icons8.com/ios-filled/50/ffffff/document.png"
          title="Contrato Residencial/Comercial Id n."
          subtitle="Ativo, 30 meses"
          details={
            <>
              <div>Vencimento: 20</div>
              <div>De 20/09/2024 a 19/03/2027, ocupado em 20/09/2024</div>
            </>
          }
          actions={
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded text-white bg-gray-700">Ações</button>
              <button className="px-4 py-2 border rounded text-white bg-gray-700">Imprimir</button>
              <button className="px-4 py-2 border rounded text-white bg-gray-700">Documentos</button>
            </div>
          }
        />
      </div>

      {/* Grid ocupa toda a largura disponível */}
      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        {/* Coluna da esquerda - 7 componentes */}
        <div className="flex flex-col gap-4">
        <AccordionPanel title="Informações do Contrato">
          <div className="space-y-2">
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/home.png" alt="Imóvel" />
              Tipo de Imóvel: Apartamento, Endereço Completo: Rua Exemplo, 123
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/money.png" alt="Aluguel" />
              Aluguel: R$ 1.500,00 - entrou pagando/pagou 30 dias
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/tax.png" alt="Taxa" />
              Taxa de Adm: 10%
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/exchange.png" alt="Transação" />
              Repasse: 5 dias para repasse
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/address.png" alt="Cobrança" />
              Endereço de Cobrança: Rua Cobrança, 456
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/money.png" alt="Conta" />
              Conta de Pagamento: Nome da Conta
            </div>
          </div>
        </AccordionPanel>

        <AccordionPanel title="Reajuste">
          <div className="space-y-2">
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/percentage.png" alt="Índice" />
              Índice: IGPM
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/calendar.png" alt="Primeiro Reajuste" />
              Primeiro Reajuste: 20/09/2024
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/calendar.png" alt="Segundo Reajuste" />
              Segundo Reajuste: 20/09/2025
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/calendar.png" alt="Próximo Reajuste" />
              Próximo Reajuste: 20/09/2026
            </div>
          </div>
        </AccordionPanel>
        
        <AccordionPanel title="Multa">
          <div className="space-y-2">
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/calendar.png" alt="Isento" />
              Isento da multa após 12 meses
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/calendar.png" alt="Isento" />
              Data de Isenção: 20/09/2025
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/money.png" alt="ValorMulta" />
              Valor da Multa Hoje: R$ 2.100,00
            </div>
          </div>
        </AccordionPanel>

        <AccordionPanel title="Inquilinos">
          <div className="space-y-2">
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/user.png" alt="Inquilino" />
              Nome do Inquilino: João Silva
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/phone.png" alt="Contato" />
              Contato: (11) 98765-4321
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/email.png" alt="Email" />
              Email: joao.silva@email.com
            </div>
          </div>
        </AccordionPanel>
        
        <AccordionPanel title="Proprietários">
          <div className="space-y-2">
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/user.png" alt="Proprietário" />
              Nome do Proprietário: Maria Oliveira
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/phone.png" alt="Contato" />
              Contato: (21) 91234-5678
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/email.png" alt="Email" />
              Email: maria.oliveira@email.com
            </div>
            <hr />
            <div>
              <strong>Forma de Pagamento:</strong> <img src="https://img.icons8.com/ios-filled/24/000000/money.png" alt="Pagamento" /> Pix
            </div>
            <hr />
            <div>
              <strong>Tipo de Chave:</strong> Número da chave
            </div>
            <hr />
            <div>
              <strong>Banco:</strong> Nome do Banco
            </div>
            <hr />
            <div>
              <strong>Agência:</strong> 1234
            </div>
            <hr />
            <div>
              <strong>Conta:</strong> 56789-0
            </div>
            <hr />
            <div>
              <strong>Nome:</strong> Nome da Pessoa
            </div>
          </div>
        </AccordionPanel>

        <AccordionPanel title="Garantia do Contrato">
          <div className="space-y-2">
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/file.png" alt="Garantia" />
              Tipo de Garantia: Seguro Fiança
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/calendar.png" alt="Validade" />
              Validade: Até 20/09/2025
            </div>
            <hr />
            <div>
              <img src="https://img.icons8.com/ios-filled/24/000000/money.png" alt="Valor" />
              Valor do Seguro: R$ 5.000,00
            </div>
          </div>
        </AccordionPanel>

          {/* Adicione mais 6 componentes aqui */}
        </div>

        {/* Coluna da direita - 4 componentes */}
        <div className="flex flex-col gap-4">
          
        <div className="border rounded-lg shadow-sm mb-4">
          <div className="bg-gray-100 p-3 flex justify-between items-center rounded-t-lg">
            <span className="font-semibold">Despesas Mês/Ano</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Nova Despesa</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded">Mais Opções</button>
            </div>

            <div className="flex space-x-2">
              <button className="border px-4 py-2 rounded">Mês Passado</button>
              <button className="border px-4 py-2 rounded">Próximo Mês</button>
              <button className="border px-4 py-2 rounded">Mais</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border mt-3">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 w-10"></th>
                    <th className="p-2">Vencimento</th>
                    <th className="p-2">Despesas</th>
                    <th className="p-2">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2">20/09/2024</td>
                    <td className="p-2">Condomínio</td>
                    <td className="p-2">R$ 400,00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2">30/09/2024</td>
                    <td className="p-2">Manutenção Elétrica</td>
                    <td className="p-2">R$ 250,00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-sm text-gray-600">Listando 2 despesas</p>
          </div>
        </div>

          <div className="border rounded-lg shadow-sm mb-4">
            <div className="bg-gray-100 p-3 flex justify-between items-center rounded-t-lg">
              <span className="font-semibold">Comentários</span>
            </div>
            <div className="p-4 space-y-4">
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 border-b pb-3">
                  <img src="https://img.icons8.com/ios-filled/50/000000/user--v1.png" alt="Usuário" className="w-10 h-10 rounded-full" />
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="font-semibold">Rafael Gava</h6>
                      <small className="text-gray-500">25/09/2024 às 15:30</small>
                    </div>
                    <p>Confirmação de pagamento foi recebida com sucesso.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3 border-b pb-3">
                  <img src="https://img.icons8.com/ios-filled/50/000000/user--v1.png" alt="Usuário" className="w-10 h-10 rounded-full" />
                  <div className="w-full">
                    <div className="flex justify-between">
                      <h6 className="font-semibold">Natalina Santos</h6>
                      <small className="text-gray-500">24/09/2024 às 10:15</small>
                    </div>
                    <p>Recebimento do contrato confirmado.</p>
                  </div>
                </li>
              </ul>

              <div className="mt-4">
                <h6 className="font-semibold">Adicionar comentário</h6>
                <textarea className="w-full border rounded-lg p-2 mt-2" rows={3} placeholder="Escreva seu comentário aqui..."></textarea>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Comentar</button>
              </div>
            </div>
          </div>

          
          <AccordionPanel title="Checklist de Entrada">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="imprimirContratoEntrada" className="h-4 w-4" />
                <label htmlFor="imprimirContratoEntrada">Imprimir contrato de locação</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="assinaturaContratoEntrada" className="h-4 w-4" />
                <label htmlFor="assinaturaContratoEntrada">Assinatura do contrato de locação</label>
              </div>
            </div>
          </AccordionPanel>

          <AccordionPanel title="Checklist de Saída">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="imprimirContratoSaida" className="h-4 w-4" />
                <label htmlFor="imprimirContratoSaida">Imprimir contrato de locação</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="assinaturaContratoSaida" className="h-4 w-4" />
                <label htmlFor="assinaturaContratoSaida">Assinatura do contrato de locação</label>
              </div>
            </div>
          </AccordionPanel>

          <AccordionPanel title="Últimos E-mails">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Data</th>
                    <th className="border border-gray-300 p-2">Assunto</th>
                    <th className="border border-gray-300 p-2">Enviado/Recebido</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">25/09/2024</td>
                    <td className="border border-gray-300 p-2">Confirmação de pagamento</td>
                    <td className="border border-gray-300 p-2">Enviado</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">24/09/2024</td>
                    <td className="border border-gray-300 p-2">Recebimento de contrato</td>
                    <td className="border border-gray-300 p-2">Recebido</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AccordionPanel>

          {/* Adicione mais 3 componentes aqui */}
        </div>
      </div>

      {/* Componente de largura total abaixo das colunas */}
      <div className="w-full mt-4">
        <AccordionPanel title="Detalhes Adicionais">
          <div className="space-y-2">
            <p>Outras informações relevantes sobre o contrato...</p>
          </div>
        </AccordionPanel>
      </div>
    </div>
  );
}
