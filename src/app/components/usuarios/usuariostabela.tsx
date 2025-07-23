'use client'

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import styles from '@/app/components/usuarios/usuariostabela.module.css'
import { UserCheck, UserX } from "@deemlol/next-icons"

type UsuarioProps = {
  id: string,
  nome: string,
  setor: string,
  cargo: string,
  criado_em: string,
  atualizado_em: string,
}

export default function UsuariosTabela({ usuarios }: { usuarios: UsuarioProps[] }) {
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

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-center">Nome</th>
              <th className="text-center">Setor</th>
              <th className="text-center">Cargo</th>
              <th className="text-center">Criado em</th>
              <th className="text-center">Atualizado em</th>
              <th className="text-center">Opções de edição</th>
            </tr>
          </thead>
          <tbody>
          {/* Obtém os usuários salvos na tabela "Usuários" do banco e os exibe, um em cada linha de uma tabela HTML */}
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td className="text-center">{usuario.setor}</td>
              <td className="text-center">{usuario.cargo}</td>
              <td className="text-center">{usuario.criado_em}</td>
              <td className="text-center">{usuario.atualizado_em}</td>
              <td className="text-center">
                <div className="btn-group" role="group" aria-label="Navegação principal">
                  <Link className="btn btn-secondary btn-sm" href={`/painel/usuarios/${usuario.id}/editar`}><UserCheck size={18} color="#FFFFFF" /> Editar</Link>
                  <Link className="btn btn-danger btn-sm" href={`/painel/usuarios/${usuario.id}/apagar`}><UserX size={18} color="#FFFFFF" /> Apagar</Link>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
}