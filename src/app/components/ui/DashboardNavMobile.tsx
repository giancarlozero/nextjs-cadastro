'use client'

import Link from "next/link";

export default function DashboardNavMobile(){
  return(
    <nav className="btn-group" role="group" aria-label="Navegação principal">
      <Link className="btn btn-primary" href="/painel">Início</Link>
      <Link className="btn btn-primary" href="/painel/usuarios">Usuários</Link>
      <Link className="btn btn-primary" href="/">Encerrar sessão</Link>
    </nav>
  );
}