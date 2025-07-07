import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { Suspense } from "react";

export default async function Usuarios() {

  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      nome: 'desc'
    }
  })

  const data: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }

  if(!usuarios) {
    return (
      <Suspense>
        <p>Nenhum usuário cadastrado ainda. Comece a criar usuários <Link href="/painel/usuarios/criar">clicando aqui!</Link></p>
      </Suspense>
    )
  }

  return (
    <>
      <Link href="/painel/usuarios/criar">Criar usuário</Link>

      <Suspense>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Setor</th>
              <th>Cargo</th>
              <th>Criado em</th>
              <th>Atualizado em</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.setor}</td>
                <td>{usuario.cargo}</td>
                <td>{usuario.criado_em.toLocaleDateString('pt-BR', data)}</td>
                <td>{usuario.atualizado_em.toLocaleDateString('pt-BR', data)}</td>
                <td><button>Editar</button></td>
                <td><button>Apagar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </>
  );
}
