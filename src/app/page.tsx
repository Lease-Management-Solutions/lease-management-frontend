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
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.status) {
        sessionStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        alert("Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao fazer login. Verifique o console.");
    }
  };
  

  return (
    <div className="flex h-screen">
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
      ></div>

      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="senha">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}