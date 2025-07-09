'use client'

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type Usuario = {
  id: string,
  nome: string,
  setor: string,
  cargo: string,
  criado_em: string,
  atualizado_em: string,
}

export default function UsuariosTabela({ usuarios }: { usuarios: Usuario[] }) {
  const searchParams = useSearchParams()
  const [mensagem, setMensagem] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams.get('sucesso') === '1') {
      setMensagem('Usuário editado com sucesso.')

      const timeout = setTimeout(() => setMensagem(null), 5000);
      return () => clearTimeout(timeout)
    }
  }, [searchParams])

  return(
    <>
      {mensagem &&(
        <div className="editadosucesso">
          <p>{mensagem}</p>
        </div>
      )}

      <Link href="/painel/usuarios/criar">Criar usuário</Link>

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
          {/* Obtém os usuários salvos na tabela "Usuários" do banco e os exibe, um em cada linha de uma tabela HTML */}
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.setor}</td>
              <td>{usuario.cargo}</td>
              <td>{usuario.criado_em}</td>
              <td>{usuario.atualizado_em}</td>
              <td><Link href={`/painel/usuarios/${usuario.id}/editar`}>Editar</Link></td>
              <td><Link href="#">Apagar</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}