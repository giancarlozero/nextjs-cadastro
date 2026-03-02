"use client";

import Link from "next/link";

export default function LoginForm() {

  return(<>
    <form className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de e-mail</label>
      <input
        type="email"
        name="email"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
      <input
        type="password"
        name="password"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="">
        <button className="w-full bg-gray-300 p-3 rounded mt-5" type="submit">Entrar</button>
      </div>

      <br />

      <Link className="linksimples" href="#">Esqueci minha senha</Link>

      <br />

      <Link className="linksimples" href="/painel">Painel (link temporário dev)</Link>
    </form>
  </>)
}