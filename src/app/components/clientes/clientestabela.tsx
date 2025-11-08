'use client'

import Link from "next/link"
// import { UserCheck, UserX } from "@deemlol/next-icons"

type ClienteProps = {
  id: string,
  nome: string,
  documento: string,
  valor: string,
  criado_em: string,
  atualizado_em: string,
}

export default function ClientesTabela({ clientes }: { clientes: ClienteProps[] }) {
  // Se não houver nenhum serviço na tabela, retorna a mensagem
  if(!clientes || clientes.length === 0) {
    return (
      <p>Nenhum cliente cadastrado ainda. Clique no botão "Novo cliente" e comece a cadastrar alguns!</p>
    )
  }

  return(
    <>
      <table className="table-auto w-full text-md bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-center p-3">Nome ou Razão Social</th>
            <th className="text-center p-3">Documento (CPF ou CNPJ)</th>
            <th className="text-center p-3">Valor contratado (R$)</th>
            <th className="text-center p-3">Criado em</th>
            <th className="text-center p-3">Atualizado em</th>
            <th className="text-center p-3">Opções de edição</th>
          </tr>
        </thead>
        <tbody>
        {/* Obtém os serviços salvos na tabela "Serviço" do banco e os exibe, um em cada linha de uma tabela HTML */}
        {clientes.map((cliente) => (
          <tr className="border-b bg-gray-100" key={cliente.id}>
            <td className="p-3">{cliente.nome}</td>
            <td className="p-3">{cliente.documento}</td>
            <td className="text-center p-3">{cliente.valor}</td>
            <td className="text-center p-3">{cliente.criado_em}</td>
            <td className="text-center p-3">{cliente.atualizado_em}</td>
            <td className="text-center p-3">
              <div className="flex flex-row items-center justify-center gap-1" role="group" aria-label="Opções de edição">
                <Link
                  className="bg-blue-700 hover:bg-blue-800 text-white px-2 py-1 rounded"
                  href={`/painel/clientes/${cliente.id}/editar`}
                >Editar</Link>
                <Link
                  className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded"
                  href={`/painel/clientes/${cliente.id}/apagar`}
                >Apagar</Link>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}