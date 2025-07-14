import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { Suspense } from "react";
import UsuariosTabela from "@/app/components/usuarios/usuariostabela";

export default async function Usuarios() {

  // RECUPERAR todos os usuários
  // ===========================
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      nome: 'asc'
    }
  })

  // Formatação de data para o padrão brasileiro (exemplo: 01 de janeiro de 2000)
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

  // Aplicação das datas formatadas no componente 'usuariostabela.tsx'
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
