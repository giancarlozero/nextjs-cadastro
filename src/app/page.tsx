import { prisma } from "./lib/prisma";
import { redirect } from "next/navigation"
import Link from "next/link";

export default async function Home() {
  //Se a tabela Usuário estiver vazia, exiba o formulário de cadastro de primeiro acesso.
  const temUsuarios = await prisma.usuario.count();

  if(temUsuarios === 0) {
    redirect("/primeiroacesso")
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="cta h-screen w-[70%] flex flex-col items-center justify-center p-5">
          <div className="cta-texto">
            <img src="https://placehold.co/500x265?text=Logo" alt="" />
            <h1>Lorem Ipsum</h1>
            <p>Dolor Sit Amet Dolor Sit Amet Dolor Sit Amet Dolor Sit Amet </p>
          </div>
        </div>

        <div className="login w-[30%] flex flex-col items-center justify-center p-20">
          <form className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de e-mail</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

            <div className="">
              <input className="w-full bg-gray-300 p-3 rounded mt-5" type="submit" value="Entrar" />
            </div>

            <br />

            <Link className="linksimples" href="#">Esqueci minha senha</Link>

            <br />

            <Link className="linksimples" href="/painel">Painel (link temporário dev)</Link>
          </form>
        </div>
      </div>
    </>
  );
}
