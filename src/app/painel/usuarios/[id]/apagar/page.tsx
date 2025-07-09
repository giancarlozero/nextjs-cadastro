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
  const usuarioApagar = await prisma.usuario.findUnique({
    where: {
      id: params.id
    }
  })

  if(!usuarioApagar) {
    redirect('/painel/usuarios')
  }

  return (<>
      <p>Você deseja apagar o(a) usuário(a) {usuarioApagar.nome} do sistema?</p>

      <ul>
        <li>Nome: {usuarioApagar.nome}</li>
        <li>Setor: {usuarioApagar.setor}</li>
        <li>Cargo: {usuarioApagar.cargo}</li>
      </ul>

      <p><strong>ATENÇÃO: esta ação é irreversível. Recomenda-se fazer um backup antes de apagar quaisquer dados.</strong></p>

      <form action={apagarUsuario}>
        <input type="hidden" name="id" value={usuarioApagar.id} />
        <button type="submit">Apagar</button>
        <Link href="/painel/usuarios">Cancelar</Link>
      </form>
    </>
  )
}