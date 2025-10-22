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
      <table className="table-auto w-full text-md bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-center p-3">Nome</th>
            <th className="text-center p-3">Setor</th>
            <th className="text-center p-3">Cargo</th>
            <th className="text-center p-3">Criado em</th>
            <th className="text-center p-3">Atualizado em</th>
            <th className="text-center p-3">Opções de edição</th>
          </tr>
        </thead>
        <tbody>
        {/* Obtém os usuários salvos na tabela "Usuários" do banco e os exibe, um em cada linha de uma tabela HTML */}
        {admins.map((admin) => (
          <tr className="border-b bg-gray-100" key={admin.id}>
            <td className="p-3">{admin.nome} {admin.sobrenome}</td>
            <td className="text-center p-3">{admin.setor}</td>
            <td className="text-center p-3">{admin.cargo}</td>
            <td className="text-center p-3">{admin.criado_em}</td>
            <td className="text-center p-3">{admin.atualizado_em}</td>
            <td className="text-center p-3">
              <div className="flex flex-row items-center justify-center gap-1" role="group" aria-label="Opções de edição">
                <Link className="bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 rounded" href={`/painel/usuarios/${admin.id}/editar`}>Editar</Link>
                <Link className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded" href={`/painel/usuarios/${admin.id}/apagar`}>Apagar</Link>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}