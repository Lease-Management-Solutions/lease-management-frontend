"use client";

import { useState, useEffect } from "react";
import { fetchUsers, createUser, deleteUser,User, changePasswordById, toggleUserStatus, UserType } from "../models/userModel";
import { getCookie} from "../helpers/cookieHelper";
import Notification from "../components/notificationDefault";
import Link from "next/link";


type NotificationColor = "green" | "red" | "orange" | "blue";


export default function DataUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Adicionando estado para armazenar os usuários selecionados
  const [updateTrigger, setUpdateTrigger] = useState(0); 
  const [newUser, setNewUser] = useState<UserType>({
    name: "",
    cpf: "",
    rg: "",
    issuingAuthority: "",
    rgIssuingState: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      country: ""
    },
    email: "",
    password: "",
    maritalStatus: "Single",
    role: "Corretor",
    nationality: "",
    avatar: "",
    phones:[]
  });


  
  useEffect(() => {
    const fetchUserList = async () => {
      const token = getCookie("token");
      if (token) {
        try {
          const usersList = await fetchUsers(token);
          setUsers(usersList);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchUserList();
  }, [ updateTrigger ]);
  

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
  
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(newUser.email)) {
      alert("Email inválido!");
      return;
    }
    try {
      
      await createUser(newUser, token);
      setUpdateTrigger(prev => prev + 1);
      setIsModalOpen(false);
      setNewUser({
        name: "",
        cpf: "",
        rg: "",
        issuingAuthority: "",
        rgIssuingState: "",
        address: {
          street: "",
          number: "",
          neighborhood: "",
          city: "",
          state: "",
          country: ""
        },
        email: "",
        password: "",
        maritalStatus: "Single",
        role: "Corretor",
        nationality: "",
        avatar: "",
        phones:[]
      });      
  
      setNotification({
        visible: true,
        title: "Usuario ",
        message: "Criado com sucesso!.",
        color: "green",  // Cor verde
      });
      setTimeout(() => {
       setNotification({ visible: false, title: "", message: "", color: "green" });
      }, 5000);
  
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
  
  const addPhone = () => {
    setNewUser({
      ...newUser,
      phones: [...(newUser.phones ?? []), { type: "mobile", number: "" }],
    });
  };

  
  const handleDeleteUser = async (userId: string) => {
    const token = getCookie("token");
    if (!token) return;
  
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
  
    try {
      await deleteUser(userId, token);
      
      setNotification({
        visible: true,
        title: "Usuário deletado",
        message: "A página será atualizada!",
        color: "orange",
      });
  
      setTimeout(() => {
        setNotification({ visible: false, title: "", message: "", color: "green" });
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleChangePassword = async (userId: string) => {
    const token = getCookie("token");
    if (!token) return;
  
    try {
      const result = await changePasswordById(userId, token);
      toggleDropdown();
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
    await toggleUserStatus(userId, token);
    setUpdateTrigger(prev => prev + 1);
    toggleDropdown();
    setNotification({
      visible: true,
      title: "Alterado",
      message: "Status alterado com sucesso!",
      color: "orange",
    });

    setTimeout(() => {
      setNotification({ visible: false, title: "", message: "", color: "green" });
    }, 5000);
  } catch (error) {
    console.error(error);
  }
};


const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

  // Funções para as ações do dropdown
  const handleAction = async (action: string) => {
    const token = getCookie("token");
    if (!token) return;

    try {
      for (let userId of selectedUsers) {
        if (action === "password") {
          await handleChangePassword(userId);
        } else if (action === "status") {
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
                    onClick={() => handleAction("status")}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Alterar Status
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
                {users.map((user) => (
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
                        src="/default-avatar.jpg"
                        alt={`${user.name} avatar`}
                      />
                      <div className="ps-3">
                      <Link href={`/dataUsers/${user._id}`} className="text-base font-semiboldgit">
                        {user.name}
                      </Link>
                        <div className="font-normal text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.status}</td>
                    <td className="px-6 py-4">{user.phones?.[0]?.number ?? "Sem telefone"}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

        {/* Botão para criar novo usuário */}
        <button onClick={() => setIsModalOpen(true)} className="mt-4 inline-flex items-center text-gray-500 border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-6 py-3 bg-gray-200 dark:text-gray-400 dark:border-gray-600 dark:focus:ring-gray-700">
          Novo Usuário
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative p-4 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-screen bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-white">
                    Criar Novo Usuário
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600"
                    onClick={() => {
                      setIsModalOpen(false);
                      setNewUser({
                        name: "",
                        cpf: "",
                        rg: "",
                        issuingAuthority: "",
                        rgIssuingState: "",
                        address: {
                          street: "",
                          number: "",
                          neighborhood: "",
                          city: "",
                          state: "",
                          country: ""
                        },
                        email: "",
                        password: "",
                        maritalStatus: "Single",
                        role: "Corretor",
                        nationality: "",
                        avatar: "",
                        phones:[]
                      });      
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                  <input
                    type="text"
                    placeholder="Nome"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />

                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Digite seu e-mail"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                  />

                  <input
                    type="password"
                    placeholder="Senha"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="CPF"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newUser.cpf}
                    onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
                  />
                
                  <input
                    type="text"
                    placeholder="RG"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newUser.rg}
                    onChange={(e) => setNewUser({ ...newUser, rg: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Autoridade de Emissão do RG"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newUser.issuingAuthority}
                    onChange={(e) => setNewUser({ ...newUser, issuingAuthority: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Estado de Emissão do RG"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newUser.rgIssuingState}
                    onChange={(e) => setNewUser({ ...newUser, rgIssuingState: e.target.value })}
                  />

                  <input
                    type="text"
                    placeholder="Nacionalidade"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newUser.nationality}
                    onChange={(e) => setNewUser({ ...newUser, nationality: e.target.value })}
                  />

                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    value={newUser.maritalStatus}
                    onChange={(e) => {
                      const value = e.target.value as "Single" | "Married" | "Divorced" | "Widowed" | "Legally Separated" | "Stable Union";
                      setNewUser({ ...newUser, maritalStatus: value });
                    }}
                  >
                    <option value="Single">Solteiro</option>
                    <option value="Married">Casado</option>
                    <option value="Divorced">Divorciado</option>
                    <option value="Widowed">Viúvo</option>
                    <option value="Legally Separated">Separado Judicialmente</option>
                    <option value="Stable Union">União Estável</option>
                  </select>
                  <div className="col-span-2 text-black font-semibold mb-2">Telefones</div>
                    {newUser.phones?.map((phone, index) => (
                      <div key={index} className="flex gap-2">
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                          value={phone.type}
                          onChange={(e) => {
                            const updatedPhones = [...(newUser.phones ?? [])];
                            updatedPhones[index].type = e.target.value as "mobile" | "home" | "work";
                            setNewUser({ ...newUser, phones: updatedPhones });
                          }}
                        >
                          <option value="mobile">Celular</option>
                          <option value="home">Residencial</option>
                          <option value="work">Trabalho</option>
                        </select>

                        <input
                          type="text"
                          placeholder="Número"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          value={phone.number}
                          onChange={(e) => {
                            const updatedPhones = [...(newUser.phones || [])];
                            updatedPhones[index].number = e.target.value;
                            setNewUser({ ...newUser, phones: updatedPhones });
                          }}
                        />
                      </div>
                    ))}

                    <button
                      onClick={addPhone}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                    >
                      + Telefone
                    </button>
                    <div className="col-span-2 text-black font-semibold mb-2">Endereço</div>
                    <input
                      type="text"
                      placeholder="Rua"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={newUser.address.street}
                      onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, street: e.target.value } })}
                    />

                    <input
                      type="text"
                      placeholder="Número"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={newUser.address.number}
                      onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, number: e.target.value } })}
                    />

                    <input
                      type="text"
                      placeholder="Bairro"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={newUser.address.neighborhood}
                      onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, neighborhood: e.target.value } })}
                    />

                    <input
                      type="text"
                      placeholder="Cidade"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={newUser.address.city}
                      onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, city: e.target.value } })}
                    />

                    <input
                      type="text"
                      placeholder="Estado"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={newUser.address.state}
                      onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, state: e.target.value } })}
                    />

                    <input
                      type="text"
                      placeholder="País"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={newUser.address.country}
                      onChange={(e) => setNewUser({ ...newUser, address: { ...newUser.address, country: e.target.value } })}
                    />

                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="Corretor">Corretor</option>
                      <option value="Administrativo">Administrativo</option>
                      <option value="Financeiro">Financeiro</option>
                      <option value="SuperUsuario">SuperUsuario</option>
                    </select>

                    <input
                      type="file"
                      placeholder="Link do Avatar"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={newUser.avatar}
                      onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() =>{
                        setIsModalOpen(false);
                        setNewUser({
                          name: "",
                          cpf: "",
                          rg: "",
                          issuingAuthority: "",
                          rgIssuingState: "",
                          address: {
                            street: "",
                            number: "",
                            neighborhood: "",
                            city: "",
                            state: "",
                            country: ""
                          },
                          email: "",
                          password: "",
                          maritalStatus: "Single",
                          role: "Corretor",
                          nationality: "",
                          avatar: "",
                          phones:[]
                        });      
                      }}
                      className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleCreateUser}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    >
                      Criar
                    </button>
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
