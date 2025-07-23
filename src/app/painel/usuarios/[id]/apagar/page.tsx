import styles from "@/app/painel/painel.module.css"
import { prisma } from "@/app/lib/prisma";
import { apagarUsuario } from "@/app/actions/usuarios";
import { redirect } from "next/navigation";
import Link from "next/link";

type Props = {
  params: {
    id: string
  }
}

export default async function ConfirmarApagarUsuario({ params }: Props) {
  // Define usuário a ser apagado com base em seu ID
  const { id } = await params
  const usuarioApagar = await prisma.usuario.findUnique({
    where: { id: id }
  })

  // Se o usuário não for encontrado no banco de dados, redirecione para a lista de usuários
  if(!usuarioApagar) {
    redirect('/painel/usuarios')
  }

  return (
    <>
      <div className="secao-titulo container-fluid">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h1>Apagar usuário(a)</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="secao-dados container-fluid my-3">
        <div className="dados row g-3">
          <div className="col">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <p>Você deseja apagar o(a) usuário(a) <strong>{usuarioApagar.nome}</strong> do sistema?</p>

              <ul>
                <li>Nome: {usuarioApagar.nome}</li>
                <li>Setor: {usuarioApagar.setor}</li>
                <li>Cargo: {usuarioApagar.cargo}</li>
              </ul>

              <p className="text-danger"><strong>ATENÇÃO: esta ação é irreversível. Recomenda-se fazer um backup antes de apagar quaisquer dados.</strong></p>

              <form action={apagarUsuario}>
                <input type="hidden" name="id" value={usuarioApagar.id} />

                <div className="row">
                  <div className="col d-flex flex-row justify-content-between">
                    <div className="btn-group">
                      <Link className="btn btn-secondary" href="/painel/usuarios">Cancelar</Link>
                      <button className="btn btn-danger" type="submit">Apagar usuário</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}