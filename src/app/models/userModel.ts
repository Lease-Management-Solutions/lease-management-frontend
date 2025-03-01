
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  }
  
  export type UserType = {
    name: string;
    cpf: string;
    rg: string;
    issuingAuthority: string;
    rgIssuingState: string;
    address: {
      street: string;
      number: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
    };
    email: string;
    password: string;
    maritalStatus: "Single"| "Married" |"Divorced" | "Widowed" | "Legally Separated"| "Stable Union";
    role: string;
    nationality: string;
    avatar: string;
    phones?: { // Torna o campo de telefones opcional
      type: "mobile" | "home" | "work"; // Tipo de telefone
      number: string; // Número do telefone
    }[];
  }

  export const fetchUsers = async (token: string): Promise<User[]> => {
    const response = await fetch('http://localhost:2000/users', {
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
  
  export const createUser = async (newUser: UserType, token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    const userId = payload.id;
    
    const userWithCreatorInfo = {
      ...newUser,
      createdBy: userId,  
      updatedBy: userId,  
    };

    const response = await fetch("http://localhost:2000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userWithCreatorInfo),
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
    const response = await fetch(`http://localhost:2000/users/changePasswordById/${id}`, {
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
    try {
      const response = await fetch(`http://localhost:2000/users/changeUserStatusbyId/${id}`, {
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
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao tentar alterar o status");
    }
  };
  
  