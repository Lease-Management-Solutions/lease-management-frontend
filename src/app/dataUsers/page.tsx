"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Para o redirecionamento ao criar um novo usuário

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function DataUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive'>('active');
  const router = useRouter(); // Usado para redirecionar

  useEffect(() => {
    const fetchUsers = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`http://localhost:2000/users?status=${statusFilter}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Erro ao carregar usuários");
          }

          const data = await response.json();

          // A chave 'users' contém o array de usuários
          if (Array.isArray(data.users)) {
            setUsers(data.users);
          } else {
            console.error("A resposta da API não contém um array válido de usuários");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsers();
  }, [statusFilter]);

  const handleCreateUser = () => {
    router.push('/createUser'); // Redireciona para a página de criação de usuário
  };

  return (
    <div className="bg-gray-200 flex flex-col items-center justify-center flex-1 p-4">
      <h1 className="text-2xl font-bold text-black mb-4">Usuários</h1>

      {/* Filtro de status */}
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded-md ${statusFilter === 'active' ? 'bg-teal-500 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => setStatusFilter('active')}
        >
          Ativos
        </button>
        <button
          className={`px-4 py-2 rounded-md ${statusFilter === 'inactive' ? 'bg-teal-500 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => setStatusFilter('inactive')}
        >
          Inativos
        </button>
      </div>

      {/* Tabela de listagem */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-y-auto max-h-96 w-full">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-300 text-black">
                <th className="border p-2">Nome</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Função</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="text-black">
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.role}</td>
                    <td className="border p-2">{user.status}</td>
                    <td className="border p-2">
                      {/* Botões de ações */}
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                        Senha Provisória
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">
                        Excluir
                      </button>
                      <button className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2">
                        Desativar
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
                        Reativar
                      </button>
                      <button className="bg-gray-500 text-white px-4 py-2 rounded-md">
                        Salvar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border p-2 text-center">Nenhum usuário encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Botão para criar novo usuário */}
      <button
        onClick={handleCreateUser}
        className="mt-4 bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600"
      >
        Novo Usuário
      </button>
    </div>
  );
}
