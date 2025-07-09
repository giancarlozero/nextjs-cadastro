import EditarUsuarioForm from "@/app/components/editarusuarioform";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

type Props = {
  params: {
    id: string;
  }
}

export default async function EditarUsuario({ params }: Props) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: params.id },
  });

  if(!usuario) {
    return <p>Usuário não encontrado.</p>
  }

  return(
    <>
      <p>Editando o(a) usuário(a) <strong>{usuario.nome}</strong>:</p>

      <EditarUsuarioForm usuarioId={usuario.id} dadosUsuario={usuario} />

      <Link href="/painel/usuarios">Cancelar</Link>
    </>
  );
}