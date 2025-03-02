"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchUserById, updateUser, User } from "../../models/userModel";
import { getCookie } from "../../helpers/cookieHelper";
import Notification from "@/app/components/notificationDefault";


type NotificationColor = "green" | "red" | "orange" | "blue";

export default function Usuario() {
  const { id } = useParams();
  const userId = Array.isArray(id) ? id[0] : id;
  const [user, setUser] = useState<User | null>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0); 
  const [newUser, setNewUser] = useState<User>({
    _id: "", // Preencha com valor vazio ou com um valor válido
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
    phones: [],
    status: "active", // Valor de exemplo
    mustChangePassword: false, // Exemplo
    createdAt: new Date().toISOString(),
    createdBy: "admin", // Exemplo
    updatedAt: new Date().toISOString(),
    updatedBy: "admin" // Exemplo
 });
 
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      const token = getCookie("token");
      if (!token) {
        console.error("Token não encontrado");
        setLoading(false);
        return;
      }

      try {
        const userData = await fetchUserById(userId, token);
        setUser(userData as User);
        setNewUser(userData as User); // Atualiza o estado com os dados do usuário
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [userId, updateTrigger]);

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

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  const handleUpdateUser = async (userId: string, userData: any) => {
    const token = getCookie("token");
    if (!token) return;
  
    try {
      await updateUser(userId, token, userData);
      setUpdateTrigger(prev => prev + 1);
      setIsModalOpen(false);
  
      setNotification({
        visible: true,
        title: "Usuário",
        message: "Atualizado com sucesso!",
        color: "green",
      });
  
      setTimeout(() => {
        setNotification({ visible: false, title: "", message: "", color: "green" });
      }, 5000);
  
    } catch (error) {
      console.error(error);
      setNotification({
        visible: true,
        title: "Erro",
        message: "Erro ao atualizar o usuário!",
        color: "red",
      });
  
      setTimeout(() => {
        setNotification({ visible: false, title: "", message: "", color: "red" });
      }, 5000);
    }
  };
  
  
  

  return (
    <div className="bg-gray-100 text-black min-h-screen flex flex-col items-center py-10">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Usuário</h1>
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || "/default-avatar.jpg"}
            alt="Avatar"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <p><strong>CPF:</strong> {user.cpf}</p>
          <p><strong>RG:</strong> {user.rg} ({user.issuingAuthority}/{user.rgIssuingState})</p>
          <p><strong>Nacionalidade:</strong> {user.nationality}</p>
          <p><strong>Estado Civil:</strong> {user.maritalStatus}</p>
          <p>
            <strong>Endereço:</strong>{" "}
            {user.address
              ? `${user.address.street}, ${user.address.number}, ${user.address.neighborhood}, ${user.address.city} - ${user.address.state}, ${user.address.country}`
              : "Endereço não disponível"}
          </p>
          <p><strong>Telefones:</strong></p>
          <ul className="list-disc pl-5">
            {user.phones?.map((phone, index) => (
              <li key={index} className="text-gray-700">
                {phone.type}: {phone.number}
              </li>
            ))}
          </ul>
          <p><strong>Precisa mudar a senha:</strong> {user.mustChangePassword ? 'Sim' : 'Não'}</p>
          <p><strong>Criado em:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Criado por:</strong> {user.createdBy}</p>
          <p><strong>Atualizado em:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
          <p><strong>Atualizado por:</strong> {user.updatedBy}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-blue-500 hover:text-blue-700"
        >
          Editar
        </button>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="relative p-4 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-screen bg-gray-800 rounded-lg shadow-lg overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-xl font-semibold text-white">
          Editar Usuário
        </h3>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600"
          onClick={() => setIsModalOpen(false)}
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
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {/* Nome */}
        <div>
          <label className="block text-white font-semibold mb-2">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        
        {/* E-mail */}
        <div>
          <label className="block text-white font-semibold mb-2">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </div>

        {/* CPF */}
        <div>
          <label className="block text-white font-semibold mb-2">CPF</label>
          <input
            type="text"
            placeholder="CPF"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.cpf}
            onChange={(e) => setNewUser({ ...newUser, cpf: e.target.value })}
          />
        </div>

        {/* RG */}
        <div>
          <label className="block text-white font-semibold mb-2">RG</label>
          <input
            type="text"
            placeholder="RG"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.rg}
            onChange={(e) => setNewUser({ ...newUser, rg: e.target.value })}
          />
        </div>

        {/* Autor Emissor do RG */}
        <div>
          <label className="block text-white font-semibold mb-2">Autor Emissor do RG</label>
          <input
            type="text"
            placeholder="Autor Emissor do RG"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.issuingAuthority}
            onChange={(e) => setNewUser({ ...newUser, issuingAuthority: e.target.value })}
          />
        </div>

        {/* Estado Emissor do RG */}
        <div>
          <label className="block text-white font-semibold mb-2">Estado Emissor do RG</label>
          <input
            type="text"
            placeholder="Estado Emissor do RG"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.rgIssuingState}
            onChange={(e) => setNewUser({ ...newUser, rgIssuingState: e.target.value })}
          />
        </div>

        {/* Nacionalidade */}
        <div>
          <label className="block text-white font-semibold mb-2">Nacionalidade</label>
          <input
            type="text"
            placeholder="Nacionalidade"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.nationality}
            onChange={(e) => setNewUser({ ...newUser, nationality: e.target.value })}
          />
        </div>

        {/* Estado Civil */}
        <div>
          <label className="block text-white font-semibold mb-2">Estado Civil</label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.maritalStatus}
            onChange={(e) => setNewUser({ ...newUser, maritalStatus: e.target.value as "Single" | "Married" | "Divorced" | "Widowed" | "Legally Separated" | "Stable Union" })}
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
            <option value="Legally Separated">Legally Separated</option>
            <option value="Stable Union">Stable Union</option>
          </select>
        </div>

        {/* Role */}
<div>
  <label className="block text-white font-semibold mb-2">Role</label>
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
</div>


{/* Telefones */}
<div className="col-span-2 text-white font-semibold mb-2">Telefones</div>
{newUser.phones?.map((phone, index) => (
  <div key={index} className="flex gap-2 items-center">
    {/* Tipo de telefone */}
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

    {/* Número de telefone */}
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

    {/* Botão para excluir telefone */}
    <button
      onClick={() => {
        const updatedPhones = [...(newUser.phones ?? [])];
        updatedPhones.splice(index, 1); // Remove o telefone da lista
        setNewUser({ ...newUser, phones: updatedPhones });
      }}
      className="bg-red-500 text-white px-2 py-1 rounded-md ml-2"
    >
      Excluir
    </button>
  </div>
))}

{/* Botão para adicionar um novo telefone */}
<div className="flex justify-start mt-4">
  <button
    onClick={() => {
      setNewUser({
        ...newUser,
        phones: [...(newUser.phones ?? []), { type: "mobile", number: "" }],
      });
    }}
    className="bg-blue-500 text-white px-4 py-2 rounded-md"
  >
    + Telefone
  </button>
</div>


        {/* Endereço */}
        <div className="col-span-2 font-semibold text-white mb-2">Endereço</div>

        <div>
          <label className="block text-white font-semibold mb-2">Rua</label>
          <input
            type="text"
            placeholder="Rua"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.address?.street}
            onChange={(e) => setNewUser({
              ...newUser,
              address: { ...newUser.address, street: e.target.value }
            })}
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Número</label>
          <input
            type="text"
            placeholder="Número"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.address?.number}
            onChange={(e) => setNewUser({
              ...newUser,
              address: { ...newUser.address, number: e.target.value }
            })}
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Bairro</label>
          <input
            type="text"
            placeholder="Bairro"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.address?.neighborhood}
            onChange={(e) => setNewUser({
              ...newUser,
              address: { ...newUser.address, neighborhood: e.target.value }
            })}
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Cidade</label>
          <input
            type="text"
            placeholder="Cidade"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.address?.city}
            onChange={(e) => setNewUser({
              ...newUser,
              address: { ...newUser.address, city: e.target.value }
            })}
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Estado</label>
          <input
            type="text"
            placeholder="Estado"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.address?.state}
            onChange={(e) => setNewUser({
              ...newUser,
              address: { ...newUser.address, state: e.target.value }
            })}
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">País</label>
          <input
            type="text"
            placeholder="País"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={newUser.address?.country}
            onChange={(e) => setNewUser({
              ...newUser,
              address: { ...newUser.address, country: e.target.value }
            })}
          />
        </div>

        {/* Avatar */}
        <div className="col-span-2">
          <label className="block text-white font-semibold mb-2">Avatar</label>
          <input
            type="file"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
            
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 p-4 border-t rounded-b dark:border-gray-600">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
  onClick={() => handleUpdateUser(user._id, newUser)} // Passa o user._id e os dados do formulário (newUser)
  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
>
  Salvar
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
            )};




    </div>
    
  );
}
