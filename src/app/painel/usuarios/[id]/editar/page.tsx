import styles from "@/app/painel/painel.module.css"
import EditarUsuarioForm from "@/app/components/usuarios/editarusuarioform";
import { prisma } from "@/app/lib/prisma";

type Props = {
  params: {
    id: string;
  }
}

export default async function EditarUsuario({ params }: Props) {
  const { id } = await params
  const usuario = await prisma.usuario.findUnique({
    where: { id: id },
  });

  if(!usuario) {
    return <p>Usuário não encontrado.</p>
  }

  return(<>
      <div className="secao-titulo container-fluid">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h1>Edição de usuários</h1>
            </div>
          </div>
        </div>
      </div>

      <EditarUsuarioForm usuarioId={usuario.id} dadosUsuario={usuario} />
    </>
  );
}