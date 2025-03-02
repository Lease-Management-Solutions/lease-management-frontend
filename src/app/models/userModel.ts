
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  phones?: { 
    type: "mobile" | "home" | "work"; 
    number: string;
  }[];
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
  password: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "Legally Separated" | "Stable Union";
  nationality: string;
  avatar?: string;
  mustChangePassword: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
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
    phones?: { 
      type: "mobile" | "home" | "work"; 
      number: string;
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
  
  export const fetchUserById = async (id: string, token: string): Promise<User> => {
    const response = await fetch(`http://localhost:2000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Erro ao carregar usuário");
    }
  
    const data = await response.json();
  
    if (data.user) {
      return data.user;
    } else {
      throw new Error("Usuário não encontrado na resposta da API");
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
  
  export const updateUser = async (userId: string, token: string, userData: any) => {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    const updatedBy = payload.id; // Pegando o id do usuário para o campo updatedBy
  
    // Adicionando os dados que já temos (data e updatedBy) aos dados enviados
    const userWithUpdateInfo = {
      ...userData, // Adiciona os dados do modal
      updatedAt: new Date().toISOString(),
      updatedBy: updatedBy,
    };
  
    console.log("Enviando dados para a requisição:", userWithUpdateInfo); // Verificação de dados antes de enviar
  
    const response = await fetch(`http://localhost:2000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userWithUpdateInfo),
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na requisição:", errorText); // Log de erro para depuração
      throw new Error("Erro ao atualizar usuário");
    }
  
    const result = await response.json();
    console.log("Resposta da API:", result); // Verifique o que a API está retornando
    return result;
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
  
  