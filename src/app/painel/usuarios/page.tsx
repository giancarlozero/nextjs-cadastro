import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { Suspense } from "react";
import UsuariosTabela from "@/app/components/usuarios/usuariostabela";
import styles from '@/app/painel/painel.module.css'

export default async function Usuarios() {

  // RECUPERAR todos os usuários
  // ===========================
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      nome: 'asc'
    }
  })

  // Formatação de data para o padrão brasileiro (exemplo: 01 de janeiro de 2000)
  const dataFormato: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }

  // Se não houver nenhum usuário na tabela, retorna a mensagem
  if(!usuarios || usuarios.length === 0) {
    return (
      <Suspense>
        <p>Nenhum usuário cadastrado ainda. Comece a criar usuários <Link href="/painel/usuarios/criar">clicando aqui</Link>!</p>
      </Suspense>
    )
  }

  // Aplicação das datas formatadas no componente 'usuariostabela.tsx'
  const datasFormatadas = usuarios.map((u) => ({
    ...u,
    criado_em: u.criado_em.toLocaleDateString('pt-BR', dataFormato),
    atualizado_em: u.atualizado_em.toLocaleDateString('pt-BR', dataFormato)
  }))

  return (
    <>
      <div className="secao-titulo container-fluid">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <div className="row">
                <div className="col-11">
                  <h1>Cadastro de usuários</h1>
                </div>
                <div className="col-1">
                  <Link className="btn btn-success" href="/painel/usuarios/criar">Criar usuário</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="secao-dados container-fluid my-3">
        <div className="dados row g-3">
          <div className="col-3">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h2>Modificações recentes</h2>
              <ul>
                <li>Mudança - Data</li>
                <li>Mudança - Data</li>
                <li>Mudança - Data</li>
                <li>Mudança - Data</li>
                <li>Mudança - Data</li>
              </ul>
            </div>
          </div>

          <div className="col-9">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h2>Todos os usuários</h2>

              <Suspense>
                <UsuariosTabela usuarios={datasFormatadas} />
              </Suspense>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
