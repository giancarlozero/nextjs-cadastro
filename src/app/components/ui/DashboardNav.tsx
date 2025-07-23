'use client'

import Link from "next/link";

export default function DashboardNav(){
  return(
    <nav className="btn-group" role="group" aria-label="Navegação principal">
      <Link className="btn btn-secondary" href="/painel">Início</Link>
      <Link className="btn btn-secondary" href="/painel/usuarios">Usuários</Link>
    </nav>
  );
}