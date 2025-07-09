import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { Suspense } from "react";
import UsuariosTabela from "@/app/components/usuariostabela";

export default async function Usuarios() {

  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      nome: 'asc'
    }
  })

  const dataFormato: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }

  // Se não houver nenhum usuário na tabela, retorna a mensagem
  if(!usuarios || usuarios.length === 0) {
    return (
      <Suspense>
        <p>Nenhum usuário cadastrado ainda. Comece a criar usuários <Link href="/painel/usuarios/criar">clicando aqui</Link>!</p>
      </Suspense>
    )
  }

  const datasFormatadas = usuarios.map((u) => ({
    ...u,
    criado_em: u.criado_em.toLocaleDateString('pt-BR', dataFormato),
    atualizado_em: u.atualizado_em.toLocaleDateString('pt-BR', dataFormato)
  }))

  return (
    <Suspense>
      <UsuariosTabela usuarios={datasFormatadas} />
    </Suspense>
  );
}
