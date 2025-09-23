import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { Suspense } from "react";
import RegistroAlteracoes from "@/app/components/usuarios/registroalteracoes";
import UsuariosTabela from "@/app/components/usuarios/usuariostabela";
import AdminsTabela from "@/app/components/usuarios/adminstabela";
import styles from '@/app/painel/painel.module.css'

export default async function Usuarios() {

  // RECUPERAR todos os administradores
  // ==================================
  const admins = await prisma.usuario.findMany({
    where: {
      nivel_acesso: "Administrador",
    },
    orderBy: {
      nome: 'asc'
    }
  })

  // RECUPERAR todos os usuários
  // ===========================
  const usuarios = await prisma.usuario.findMany({
    where: {
      nivel_acesso: "Usuário"
    },
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

  // Aplicação das datas formatadas no componente 'adminstabela.tsx'
  const datasFormatadasAdmins = admins.map((u) => ({
    ...u,
    criado_em: u.criado_em.toLocaleDateString('pt-BR', dataFormato),
    atualizado_em: u.atualizado_em.toLocaleDateString('pt-BR', dataFormato)
  }))

  // Aplicação das datas formatadas no componente 'usuariostabela.tsx'
  const datasFormatadasUsuarios = usuarios.map((u) => ({
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
                  <h1>Cadastro de usuários</h1>
                </div>
                <div className="col-2 d-flex flex-row justify-content-end">
                  <Link className="btn btn-success" href="/painel/usuarios/criar">Criar usuário</Link>
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
                  <p>Cadastro dos funcionários, colaboradores e gestores que trabalham nesta empresa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="secao-dados container-fluid my-3 p-0">
        <div className="dados row g-3">
          <RegistroAlteracoes />

          <div className="col-9">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h2>Todos os administradores</h2>

              <Suspense>
                <AdminsTabela admins={datasFormatadasAdmins} />
              </Suspense>

              <h2>Todos os usuários</h2>
              <Suspense>
                <UsuariosTabela usuarios={datasFormatadasUsuarios} />
              </Suspense>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
