import PrimeiroAcessoForm from "../components/primeiroacesso/primeiroacessoform";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Primeiro Acesso | NextJS CRUD",
};

export default async function PrimeiroAcesso() {
  return(
    <>
      <div className="w-full md:h-dvh bg-gray-200">
        <div className="md:h-screen flex flex-col items-center justify-center p-3">
          {/* <img src="https://placehold.co/200x120?text=Logo" alt="" /> */}
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