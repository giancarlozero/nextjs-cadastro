'use client'

import Link from "next/link";

export default function DashboardNav(){
  return(
    <nav className="btn-group">
      <Link href="/painel" className="btn btn-dark">Início</Link>
      <Link href="/painel/usuarios" className="btn btn-dark">Usuários</Link>
    </nav>
  );
}