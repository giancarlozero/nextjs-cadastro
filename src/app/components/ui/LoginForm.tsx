"use client";

// https://dev.to/sizan_mahmud0_e7c3fd0cb68/complete-guide-to-jwt-authentication-in-nextjs-15-from-setup-to-production-3cf4

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await response.json();

      if(!response.ok) {
        throw new Error(dados.error || "Erro de login.");
      }

      router.push('/painel');
      router.refresh();
    } catch(error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return(<>
    <form onSubmit={handleLogin} className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de e-mail</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
      <input
        type="password"
        name="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-300 p-3 rounded mt-5"
        >
          { loading ? 'Conectando...' : 'Entrar' }
        </button>
      </div>

      {/* <br />

      <Link className="linksimples" href="#">Esqueci minha senha</Link> */}

      <br /><br />

      <Link className="linksimples" href="/painel">Link temporário para testar autenticação</Link>

      <br />

      <Link className="linksimples" href="/primeiroacesso">Link temporário para testar formulário de primeiro acesso</Link>
    </form>
  </>)
}