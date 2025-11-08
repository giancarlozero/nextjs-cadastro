import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { Suspense } from "react";
import RegistroAlteracoes from "@/app/components/usuarios/registroalteracoes";
import ClientesTabela from "@/app/components/clientes/clientestabela";
import styles from '@/app/painel/painel.module.css'

export default async function Clientes() {

  // RECUPERAR todos os clientes
  // ==================================
  const clientes = await prisma.cliente.findMany({
    include: {
      servicos: true,
    },
    orderBy: {
      nome: 'asc'
    }
  });

  // Formatação das datas de criação e atualização
  // =============================================
  function formatarData(date: Date) {
    return date.toLocaleString("pt-BR", {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const clientesComValorContratado = clientes.map((c) => ({
    id: c.id,
    nome: c.nome,
    documento: c.documento,
    valor: c.valor,
    criado_em: formatarData(c.criado_em),
    atualizado_em: formatarData(c.atualizado_em),
  }));

  return (
    <>
      <div className={["secao-titulo flex flex-row items-center justify-items-center m-2 p-2 border rounded", styles.boxConteudo].join(" ")}>
        <div className="w-full">
          <h1>Cadastro de clientes</h1>
            <p>Cadastro dos clientes que mantém contratos ativos com esta empresa.</p>
        </div>
        <div className="w-2/12 flex flex-row justify-end">
          <Link
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded"
            href="/painel/clientes/criar"
          >Novo cliente</Link>
        </div>
      </div>

      <div className="secao-dados flex flex-row gap-2.5 m-2">
        <RegistroAlteracoes />

        <div className="w-9/12">
          <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
            <h2>Todos os clientes</h2>

            <Suspense>
              <ClientesTabela clientes={clientesComValorContratado} />
            </Suspense>

          </div>
        </div>
      </div>
    </>
  );
}
