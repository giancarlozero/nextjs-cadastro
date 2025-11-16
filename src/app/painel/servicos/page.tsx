import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { Suspense } from "react";
import RegistroAlteracoes from "@/app/components/usuarios/registroalteracoes";
import ServicosTabela from "@/app/components/servicos/servicostabela";
import styles from '@/app/painel/painel.module.css'

export default async function Servicos() {

  // RECUPERAR todos os serviços
  // ===========================
  const servicos = await prisma.servico.findMany({
    orderBy: {
      titulo: 'asc'
    }
  })

  // Formatação de data para o padrão brasileiro (exemplo: 01 de janeiro de 2000)
  const dataFormato: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }

  // Aplicação das datas formatadas n componente 'servicostabela.tsx'
  const datasFormatadasServicos = servicos.map((u) => ({
    ...u,
    criado_em: u.criado_em.toLocaleDateString('pt-BR', dataFormato),
    atualizado_em: u.atualizado_em.toLocaleDateString('pt-BR', dataFormato)
  }))

  return (
    <>
      <div className={["secao-titulo flex flex-row items-center justify-items-center m-2 p-2 border rounded", styles.boxConteudo].join(" ")}>
        <div className="w-full">
          <h1>Cadastro de serviços</h1>
          <p>Cadastro dos serviços oferecidos por esta empresa a seus clientes.</p>
        </div>
        <div className="w-2/12 flex flex-row justify-end">
          <Link className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded" href="/painel/servicos/criar">Novo serviço</Link>
        </div>
      </div>

      <div className="secao-dados flex flex-row gap-2.5 m-2">
        <RegistroAlteracoes />

        <div className="w-9/12">
          <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
            <h2>Todos os serviços</h2>
            <Suspense>
              <ServicosTabela servicos={datasFormatadasServicos} />
            </Suspense>

          </div>
        </div>
      </div>
    </>
  );
}
