"use client";

import { useState, useEffect } from "react";
import { fetchUsers, createUser, deleteUser,User, changePasswordById, toggleUserStatus } from "../models/userModel";
import { getCookie} from "../helpers/cookieHelper";

export default function DataUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive'>('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "Corretor", avatar: "" });

  useEffect(() => {
    const fetchUserList = async () => {
      const token = getCookie("token");
      if (token) {
        try {
          const usersList = await fetchUsers(statusFilter, token);
          setUsers(usersList);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserList();
  }, [statusFilter]);

  const handleCreateUser = async () => {
    const token = getCookie("token");
    if (!token) return;
  
    try {
      
      await createUser(newUser, token);
  
      alert("Usuário criado com sucesso!");
  
      setIsModalOpen(false);
  
      setNewUser({ name: "", email: "", password: "", role: "Corretor", avatar: "" });
  
      const updatedUsers = await fetchUsers('active', token); // Chama novamente a função de buscar usuários
      setUsers(updatedUsers); // Atualiza o estado da lista de usuários
       setStatusFilter('active');
  
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteUser = async (userId: string) => {
    const token = getCookie("token");
    if (!token) return;

    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      await deleteUser(userId, token);
      alert("Usuário excluído com sucesso!");
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = async (userId: string) => {
    const token = getCookie("token");
    if (!token) return;
  
    try {
      const result = await changePasswordById(userId, token);
      alert(result.message || "Senha provisória alterada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleStatus = async (userId: string) => {
    const token = getCookie("token");
    if (!token) return;
  
    try {
      const result = await toggleUserStatus(userId, token);
      alert(result.message || "Status alterado com sucesso!");
    } catch (error) {
      console.error(error);
    }
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
                    <button
                        onClick={() => handleChangePassword(user._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Senha Provisória
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Excluir
                    </button>
                    
                    {user.status === 'active' ? (
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Desativar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Reativar
                      </button>
                    )}
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className=" text-black border p-2 text-center">
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}

            </tbody>
          </table>
        </div>
      )}

      {/* Botão para criar novo usuário */}
      <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600">
        Novo Usuário
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-black text-xl font-bold mb-4">Criar Novo Usuário</h2>
            <input type="text" placeholder="Nome" className=" text-black border p-2 w-full mb-2" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
            <input type="email" placeholder="Email" className="text-black border p-2 w-full mb-2" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <input type="password" placeholder="Senha" className="text-black border p-2 w-full mb-2" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <select className="text-black border p-2 w-full mb-2" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="Corretor">Corretor</option>
              <option value="Administrativo">Administrativo</option>
              <option value="Financeiro">Financeiro</option>
              <option value="SuperUsuario">SuperUsuario</option>
            </select>
            <input type="text" placeholder="Link do Avatar" className="text-black border p-2 w-full mb-2" value={newUser.avatar} onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })} />
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2">Cancelar</button>
              <button onClick={handleCreateUser} className="bg-teal-500 text-white px-4 py-2 rounded-md">Criar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
