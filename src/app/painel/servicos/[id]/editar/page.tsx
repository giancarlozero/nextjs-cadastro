import styles from "@/app/painel/painel.module.css"
import EditarUsuarioForm from "@/app/components/usuarios/editarusuarioform";
import { prisma } from "@/app/lib/prisma";

export default async function EditarUsuario(props: {params: Promise<{id: string}>}) {
  const params = await props.params;
  const usuario = await prisma.usuario.findUnique({
    where: { id: params.id },
  });

  if(!usuario) {
    return <p>Usuário não encontrado.</p>
  }

  return(
    <>
      <div className="secao-titulo container-fluid">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h1>Edição de usuários</h1>
            </div>
          </div>
        </div>
      </div>

      <EditarUsuarioForm usuario={usuario} />
    </>
  );
}