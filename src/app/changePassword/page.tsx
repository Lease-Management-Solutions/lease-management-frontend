"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Função para verificar se as senhas coincidem
  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== newPassword) {
      setPasswordError("As senhas não coincidem.");
    } else {
      setPasswordError("");
    }
  };

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem.");
      return;
    }

    const token = sessionStorage.getItem("tempToken");

    if (!token) {
      alert("Token ausente. Por favor, faça login novamente.");
      return;
    }

    setIsSubmitting(true); // Inicia o estado de submissão

    try {
      const response = await fetch("http://localhost:2000/users/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  // Enviando o token no header
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Senha alterada com sucesso!");
        router.push("/"); // Redireciona para a tela de login após sucesso
      } else {
        alert(data.error || "Erro ao alterar a senha.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao fazer a solicitação. Verifique o console.");
    } finally {
      setIsSubmitting(false); // Finaliza o estado de submissão
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center mb-6">
          Change Password
        </h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full p-2.5 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2.5 text-sm border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={handlePasswordConfirmChange} // Chama a função para verificar as senhas
              required
            />
          </div>
          {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={isSubmitting} // Desabilita o botão durante a submissão
          >
            Alterar Senha
          </button>
        </form>
      </div>
    </section>
  );
}
