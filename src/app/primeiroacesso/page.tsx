import PrimeiroAcessoForm from "../components/primeiroacesso/primeiroacessoform";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Primeiro Acesso | NextJS CRUD",
};

export default async function PrimeiroAcesso() {
  //Se a tabela Usuário estiver vazia, exiba o formulário de cadastro de primeiro acesso.
  const temUsuarios = await prisma.usuario.count();

  if(temUsuarios >= 1) {
    redirect("/")
  }

  return(
    <>
      <div className="w-full md:h-dvh bg-gray-200">
        <div className="md:h-screen flex flex-col items-center justify-center p-3">
          <h1>Olá!</h1>
          <p>Boas vindas ao sistema de gestão para agências de publicidade.</p>
          <p>Como esta é a primeira vez que você usa este sistema, será necessário criar uma <strong>conta de Administrador</strong>.</p>
          <p>Por favor preencha o formulário com os dados solicitados. <strong>Todos os campos são obrigatórios</strong>.</p>

          <PrimeiroAcessoForm />

          <p><small>Depois desse primeiro cadastro, você poderá cadastrar seus(suas) funcionários(as), clientes e outras informações importantes.</small></p>
        </div>
      </div>
    </>
  )
}