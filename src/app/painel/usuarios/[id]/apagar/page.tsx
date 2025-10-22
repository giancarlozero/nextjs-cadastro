import styles from "@/app/painel/painel.module.css"
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import ApagarUsuarioForm from "@/app/components/usuarios/apagarusuarioform";

type UsuarioApagadoProps = {
  params: {
    id: string
  }
}

export default async function ConfirmarApagarUsuario({ params }: UsuarioApagadoProps) {
  // Define usuário a ser apagado com base em seu ID
  const { id } = await params;
  const usuario = await prisma.usuario.findUnique({
    where: { id: id }
  });

  // Se o usuário não for encontrado no banco de dados, redirecione para a lista de usuários
  if(!usuario) {
    redirect('/painel/usuarios?encontrado=0');
  }

  return (
    <>
      
      <div className={["secao-titulo m-2 px-2 border rounded", styles.boxConteudo].join(" ")}>
        <h1>Apagar usuário(a)</h1>
      </div>
          

      <div className="secao-dados container-fluid my-3 px-2">
        <div className="dados row g-3">
          <div className="col">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <p>Você deseja apagar o(a) usuário(a) <strong>{usuario.nome}</strong> do sistema?</p>

              <ul>
                <li>Nome completo: <strong>{usuario.nome} {usuario.sobrenome}</strong></li>
                <li>Setor: <strong>{usuario.setor}</strong></li>
                <li>Cargo: <strong>{usuario.cargo}</strong></li>
              </ul>

              <div className="w-fit block bg-red-700 p-2 my-2 rounded">
                <p className="text-white mt-2"><strong>ATENÇÃO: esta ação é irreversível.</strong> Recomenda-se fazer um backup antes de apagar quaisquer dados.</p>
              </div>

              <ApagarUsuarioForm usuario={usuario} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}