"use client";

import { useState, useEffect } from "react";
import { fetchUsers, createUser, deleteUser,User, changePasswordById, toggleUserStatus } from "../models/userModel";
import { getCookie} from "../helpers/cookieHelper";
import Notification from "../components/notificationDefault";

type NotificationColor = "green" | "red" | "orange" | "blue";



export default function DataUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<'active' | 'inactive'>('active');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "Corretor", avatar: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Adicionando estado para armazenar os usuários selecionados
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  const [notification, setNotification] = useState<{
    visible: boolean;
    title: string;
    message: string;
    color: NotificationColor;  // Garantindo que color é do tipo NotificationColor
  }>({
    visible: false,
    title: "",
    message: "",
    color: "green", // Cor padrão
  });
  
  const handleCreateUser = async () => {
    const token = getCookie("token");
    if (!token) return;
  
    try {
      
      await createUser(newUser, token);
      setNotification({
        visible: true,
        title: "Usuario ",
        message: "Criado com sucesso!.",
        color: "green",  // Cor verde
      });
      setIsModalOpen(false);
  
      setNewUser({ name: "", email: "", password: "", role: "Corretor", avatar: "" });
  
      setTimeout(() => {
       setNotification({ visible: false, title: "", message: "", color: "green" });
      }, 5000);
  
    
      const updatedUsers = await fetchUsers('active', token); // Chama novamente a função de buscar usuários
      setUsers(updatedUsers); // Atualiza o estado da lista de usuários
       setStatusFilter('active');
  
    } catch (error) {
      console.error(error);
      setNotification({
        visible: true,
        title: "Erro ",
        message: "Erro ao criar o usuário!.",
        color: "red", 
      });
      setTimeout(() => {
        setNotification({ visible: false, title: "", message: "", color: "green" });
       }, 5000);
    }
  };
  

  const handleDeleteUser = async (userId: string) => {
    const token = getCookie("token");
    if (!token) return;

    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      await deleteUser(userId, token);
      setNotification({
        visible: true,
        title: "Detelado ",
        message: "Usuário deletado com sucesso!",
        color: "orange", 
      });
      setTimeout(() => {
        setNotification({ visible: false, title: "", message: "", color: "green" });
       }, 5000);

      setUsers(users.filter(user => user._id !== userId));
      const updatedUsers = await fetchUsers('active', token); // Chama novamente a função de buscar usuários
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = async (userId: string) => {
    const token = getCookie("token");
    if (!token) return;
  
    try {
      const result = await changePasswordById(userId, token);
      setNotification({
        visible: true,
        title: "Senha Provissória ",
        message: "Senha alterada com sucesso!",
        color: "blue", 
      });
      setTimeout(() => {
        setNotification({ visible: false, title: "", message: "", color: "green" });
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };
  const handleToggleStatus = async (userId: string) => {
    const token = getCookie("token");
    if (!token) return;
  
    try {
      const result = await toggleUserStatus(userId, token);
      setNotification({
        visible: true,
        title: "Detelado ",
        message: "Usuário deletado com sucesso!",
        color: "orange", 
      });
      setTimeout(() => {
        setNotification({ visible: false, title: "", message: "", color: "green" });
      }, 5000);
       
    } catch (error) {
      console.error(error);
    }
  };
  // Funções para as ações do dropdown
  const handleAction = async (action: string) => {
    const token = getCookie("token");
    if (!token) return;

    try {
      for (let userId of selectedUsers) {
        if (action === "password") {
          await handleChangePassword(userId);
        } else if (action === "activate") {
          await handleToggleStatus(userId);
        } else if (action === "deactivate") {
          await handleToggleStatus(userId);
        } else if (action === "delete") {
          await handleDeleteUser(userId);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-col flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <div className="relative p-2">
          <button
            id="dropdownActionButton"
            onClick={toggleDropdown}
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span className="sr-only">Action button</span>
            Ação
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div
              id="dropdownAction"
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <a
                    href="#"
                    onClick={() => handleAction("password")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Senha Provisória
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleAction("activate")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Ativar conta
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleAction("deactivate")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Desativar conta
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  onClick={() => handleAction("delete")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Deletar User
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Filtro de status */}
        <div className="mb-4 flex gap-4">
          <button
            className={`inline-flex items-center text-gray-500 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:text-gray-400 dark:border-gray-600 dark:focus:ring-gray-700 ${statusFilter === 'active' ? 'bg-gray-200 text-white' : 'bg-white dark:bg-gray-800 dark:hover:bg-gray-700 text-black dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-600'}`}
            onClick={() => setStatusFilter('active')}
          >
            Ativos
          </button>
          <button
            className={`inline-flex items-center text-gray-500 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:text-gray-400 dark:border-gray-600 dark:focus:ring-gray-700 ${statusFilter === 'inactive' ? 'bg-gray-200 text-white' : 'bg-white dark:bg-gray-800 dark:hover:bg-gray-700 text-black dark:text-gray-400 dark:border-gray-600 dark:hover:border-gray-600'}`}
            onClick={() => setStatusFilter('inactive')}
          >
            Inativos
          </button>
        </div>

        {/* Tabela de listagem */}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="p-2 pb-4 overflow-y-auto max-h-96 w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={(e) => {
                          // Lógica para selecionar todos os usuários
                          setSelectedUsers(e.target.checked ? users.map(user => user._id) : []);
                        }}
                      />
                      <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Função</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Contato</th>
                </tr>
              </thead>
              <tbody>
                {users.filter(user => user.status === statusFilter).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      Não há usuários {statusFilter === 'active' ? 'ativos' : 'inativos'} no momento.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-user-${user._id}`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={(e) => {
                            const selectedUserIds = e.target.checked
                              ? [...selectedUsers, user._id]
                              : selectedUsers.filter(id => id !== user._id);
                            setSelectedUsers(selectedUserIds);
                          }}
                        />
                        <label
                          htmlFor={`checkbox-user-${user._id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td
  scope="row"
  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
>
  <img
    className="w-10 h-10 rounded-full"
    src="/default-avatar.jpg" // Usar um avatar padrão se não houver
    alt={`${user.name} avatar`}
  />
  <div className="ps-3">
    <div className="text-base font-semibold">{user.name}</div>
    <div className="font-normal text-gray-500">{user.email}</div>
  </div>
</td>

                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">email</td>
                  </tr>
                  
                )))}
              </tbody>
            </table>
          </div>
        )}

        {/* Botão para criar novo usuário */}
        <button onClick={() => setIsModalOpen(true)} className="mt-4 inline-flex items-center text-gray-500 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-6 py-3 bg-gray-200 dark:text-gray-400 dark:border-gray-600 dark:focus:ring-gray-700">
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

        {notification.visible && (
        <Notification 
          title={notification.title} 
          message={notification.message} 
          color={notification.color} 
        />
        )}
      </div>
    </div>
  );
}
