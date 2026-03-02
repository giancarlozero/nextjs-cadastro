import LoginForm from "./components/ui/LoginForm";

import { prisma } from "./lib/prisma";
import { redirect } from "next/navigation"

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
          <LoginForm />
        </div>
      </div>
    </>
  );
}
