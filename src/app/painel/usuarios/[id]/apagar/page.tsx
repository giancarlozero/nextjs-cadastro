import styles from "@/app/painel/painel.module.css"
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { apagarUsuario } from "@/app/actions/usuarios";

type UsuarioApagadoProps = {
  params: {
    id: string
  }
}

export default async function ConfirmarApagarUsuario({ params }: UsuarioApagadoProps) {
  // Define usuário a ser apagado com base em seu ID
  const { id } = await params;
  const usuarioApagar = await prisma.usuario.findUnique({
    where: { id: id }
  });

  // Se o usuário não for encontrado no banco de dados, redirecione para a lista de usuários
  if(!usuarioApagar) {
    redirect('/painel/usuarios?encontrado=0');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await apagarUsuario(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/painel/usuarios");
    } else {
      toast.error(res.message);
    }
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
                <li>Nome completo: <strong>{usuarioApagar.nome} {usuarioApagar.sobrenome}</strong></li>
                <li>Setor: <strong>{usuarioApagar.setor}</strong></li>
                <li>Cargo: <strong>{usuarioApagar.cargo}</strong></li>
              </ul>

              <p className="text-danger"><strong>ATENÇÃO: esta ação é irreversível.</strong> Recomenda-se fazer um backup antes de apagar quaisquer dados.</p>

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