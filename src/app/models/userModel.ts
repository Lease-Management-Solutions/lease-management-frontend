
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  }
  
  export const fetchUsers = async (statusFilter: 'active' | 'inactive', token: string): Promise<User[]> => {
    const response = await fetch(`http://localhost:2000/users?status=${statusFilter}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Erro ao carregar usuários");
    }
  
    const data = await response.json();
  
    if (Array.isArray(data.users)) {
      return data.users;
    } else {
      throw new Error("A resposta da API não contém um array válido de usuários");
    }
  };
  
  export const createUser = async (newUser: { name: string; email: string; password: string; role: string; avatar: string }, token: string) => {
    const response = await fetch("http://localhost:2000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUser),
    });
  
    if (!response.ok) {
      throw new Error("Erro ao criar usuário");
    }
  
    return await response.json();
  };
  
  export const deleteUser = async (userId: string, token: string) => {
    const response = await fetch(`http://localhost:2000/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Erro ao excluir usuário");
    }
  
    return userId;
  };
  
  export const changePasswordById = async (id: string, token: string) => {
    const response = await fetch(`http://localhost:2000/users/changePasswordById${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword: 'temporarypassword' }), // senha provisória
    });
  
    if (!response.ok) {
      throw new Error("Erro ao trocar a senha");
    }
  
    const data = await response.json();
    return data;
  };
  
  export const toggleUserStatus = async (id: string, token: string) => {
    const response = await fetch(`http://localhost:2000/users/changeUserStatusbyId${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Erro ao alterar o status");
    }
  
    const data = await response.json();
    return data;
  };
  