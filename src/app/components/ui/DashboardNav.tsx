'use client'

import Link from "next/link";
import { House, Users } from "@deemlol/next-icons"

export default function DashboardNav(){
  return(
    <nav className="btn-group">
      <Link href="/painel" className="btn btn-dark"><House size={24} color="#FFFFFF" /> Início</Link>
      <Link href="/painel/usuarios" className="btn btn-dark"><Users size={24} color="#FFFFFF" /> Usuários</Link>
    </nav>
  );
}