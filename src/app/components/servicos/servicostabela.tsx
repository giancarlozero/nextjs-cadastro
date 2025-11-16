'use client'

import Link from "next/link"
// import { UserCheck, UserX } from "@deemlol/next-icons"

type ServicoProps = {
  id: string,
  titulo: string,
  descricao: string,
  preco: string,
  criado_em: string,
  atualizado_em: string,
}

export default function ServicosTabela({ servicos }: { servicos: ServicoProps[] }) {
  // Se não houver nenhum serviço na tabela, retorna a mensagem
  if(!servicos || servicos.length === 0) {
    return (
      <p>Nenhum serviço cadastrado ainda. Clique no botão "Novo serviço" e comece a cadastrar alguns!</p>
    )
  }

  return(
    <>
      <table className="table-auto w-full text-md bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-center p-3">Título</th>
            <th className="text-center p-3">Descrição</th>
            <th className="text-center p-3">Preço (R$)</th>
            <th className="text-center p-3">Criado em</th>
            <th className="text-center p-3">Atualizado em</th>
            <th className="text-center p-3">Opções de edição</th>
          </tr>
        </thead>
        <tbody>
        {/* Obtém os serviços salvos na tabela "Serviço" do banco e os exibe, um em cada linha de uma tabela HTML */}
        {servicos.map((servico) => (
          <tr className="border-b bg-gray-100" key={servico.id}>
            <td className="p-3">{servico.titulo}</td>
            <td className="p-3">{servico.descricao}</td>
            <td className="text-center p-3">{servico.preco}</td>
            <td className="text-center p-3">{servico.criado_em}</td>
            <td className="text-center p-3">{servico.atualizado_em}</td>
            <td className="text-center p-3">
              <div className="flex flex-row items-center justify-center gap-1" role="group" aria-label="Opções de edição">
                <Link
                  className="bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 rounded"
                  href={`/painel/servicos/${servico.id}/editar`}
                >Editar
                </Link>
                <Link
                  className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded"
                  href={`/painel/servicos/${servico.id}/apagar`}
                >Apagar
                </Link>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}