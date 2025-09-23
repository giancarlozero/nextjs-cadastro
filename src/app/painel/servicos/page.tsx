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
      <div className="secao-titulo container-fluid p-0">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <div className="row">
                <div className="col-10">
                  <h1>Cadastro de serviços</h1>
                </div>
                <div className="col-2 d-flex flex-row justify-content-end">
                  <Link className="btn btn-success" href="/painel/servicos/criar">Criar serviço</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="secao-descricao container-fluid p-0">
        <div className="descricao row">
          <div className="col-12">
            <div className={["p-1 mt-3 border rounded", styles.boxConteudo].join(" ")}>
              <div className="row">
                <div className="col-12">
                  <p>Cadastro dos serviços oferecidos por esta empresa a seus clientes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="secao-dados container-fluid my-3 p-0 p-0">
        <div className="dados row g-3">
          <RegistroAlteracoes />

          <div className="col-9">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h2>Todos os serviços</h2>
              <Suspense>
                <ServicosTabela servicos={datasFormatadasServicos} />
              </Suspense>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
