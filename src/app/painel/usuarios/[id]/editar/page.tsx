import EditarUsuarioForm from "@/app/components/usuarios/editarusuarioform";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import styles from '@/app/painel/usuarios/[id]/editar/editar.module.css'

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

  return(
    <div className="row gx-3 mb-3">
      <div className="col p-2 border rounded">
        <p>Use o formulário para editar as informações do(a) usuário(a) <strong>{usuario.nome}</strong>. Você pode escolher qualquer campo para substituir as informações desejadas.</p>
        <p>Para alterar o usuário e senha acesse suas configurações de perfil.</p>
      </div>
      <div className="col p-2 border rounded">
        <EditarUsuarioForm usuarioId={usuario.id} dadosUsuario={usuario} />

        <Link href="/painel/usuarios">Cancelar</Link>
      </div>
    </div>
  );
}