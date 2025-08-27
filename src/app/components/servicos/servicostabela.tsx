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
      <p>Nenhum serviço cadastrado ainda. Clique no botão "Criar serviço" e comece a cadastrar alguns!</p>
    )
  }

  return(
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="text-center">Título</th>
              <th className="text-center">Descrição</th>
              <th className="text-center">Preço (R$)</th>
              <th className="text-center">Criado em</th>
              <th className="text-center">Atualizado em</th>
              <th className="text-center">Opções de edição</th>
            </tr>
          </thead>
          <tbody>
          {/* Obtém os serviços salvos na tabela "Serviço" do banco e os exibe, um em cada linha de uma tabela HTML */}
          {servicos.map((servico) => (
            <tr key={servico.id}>
              <td>{servico.titulo}</td>
              <td>{servico.descricao}</td>
              <td className="text-center">{servico.preco}</td>
              <td className="text-center">{servico.criado_em}</td>
              <td className="text-center">{servico.atualizado_em}</td>
              <td className="text-center">
                <div className="btn-group" role="group" aria-label="Opções de edição">
                  <Link className="btn btn-secondary btn-sm" href={`/painel/servicos/${servico.id}/editar`}>Editar</Link>
                  <Link className="btn btn-danger btn-sm" href={`/painel/servicos/${servico.id}/apagar`}>Apagar</Link>
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