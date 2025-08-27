'use client'

import Link from "next/link";
import styles from "@/app/components/ui/dashboardnav.module.css"

export default function DashboardNav(){
  return(<>
      <nav className={["btn-group", styles.navegacao].join(" ")}>
        <Link href="/painel" className="btn btn-dark">Início</Link>
        <Link href="/painel/usuarios" className="btn btn-dark">Usuários</Link>
        <Link href="/painel/servicos" className="btn btn-dark">Serviços</Link>
        {/* <Link href="#" className="btn btn-dark">Clientes</Link> */}
        {/* <Link href="#" className="btn btn-dark">Tarefas</Link> */}
      </nav>

      <nav className={["btn-group", styles.navegacao].join(" ")}>
        {/* <Link href="/painel/auditoria" className="btn btn-dark"><UserCheck size={20} color="#FFFFFF" /> Auditoria</Link> */}
      </nav>
    </>
  );
}