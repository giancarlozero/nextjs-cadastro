'use client'

import Link from "next/link"

type AdminProps = {
  id: string,
  nome: string,
  sobrenome: string,
  nivel_acesso: string,
  setor: string,
  cargo: string,
  criado_em: string,
  atualizado_em: string,
}

export default function AdminsTabela({ admins }: { admins: AdminProps[] }) {

  // Se não houver nenhum usuário na tabela, retorna a mensagem
  if(!admins || admins.length === 0) {
    return (
      <p>Nenhum administrador cadastrado ainda. Clique no botão "Criar usuário" e comece a cadastrar alguns!</p>
    )
  }

  return(
    <>
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
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.nome} {admin.sobrenome}</td>
              <td className="text-center">{admin.setor}</td>
              <td className="text-center">{admin.cargo}</td>
              <td className="text-center">{admin.criado_em}</td>
              <td className="text-center">{admin.atualizado_em}</td>
              <td className="text-center">
                <div className="btn-group" role="group" aria-label="Opções de edição">
                  <Link className="btn btn-secondary btn-sm" href={`/painel/usuarios/${admin.id}/editar`}>Editar</Link>
                  <Link className="btn btn-danger btn-sm" href={`/painel/usuarios/${admin.id}/apagar`}>Apagar</Link>
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