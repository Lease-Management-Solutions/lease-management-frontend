"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";



export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setSenha] = useState("");

  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:2000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status) {
        sessionStorage.setItem("token", data.token);
        document.cookie = `token=${data.token}; path=/; max-age=21600`;
        router.push("/dashboard");
      } else if (response.status === 403 && data.error === "Password change required") {
        sessionStorage.setItem("tempToken", data.tempToken);
        router.push("/changePassword");
      } 
      else if (response.status === 403 && data.error === "Usuário desativado") {
        alert("Seu usuário está desativado. Entre em contato com o administrador.");
      } else {
        alert("Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao fazer login. Verifique o console.");
    }
  };
  

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}