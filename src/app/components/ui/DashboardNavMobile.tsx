'use client'

import Link from "next/link";
import { Users } from "@deemlol/next-icons";
import { House } from "@deemlol/next-icons";
import { LogOut } from "@deemlol/next-icons";

export default function DashboardNavMobile(){
  return(
    <nav className="btn-group" role="group" aria-label="Navegação principal">
      <Link className="btn btn-primary" href="/painel"><House size={24} color="#FFFFFF" /></Link>
      <Link className="btn btn-primary" href="/painel/usuarios"><Users size={24} color="#FFFFFF" /></Link>
      <Link className="btn btn-primary" href="/"><LogOut size={24} color="#FFFFFF" /> Encerrar sessão</Link>
    </nav>
  );
}