'use client'

import Link from "next/link";
// import styles from "@/app/components/ui/dashboardnav.module.css"

export default function DashboardNav(){
  return(<>
      <Link className="px-3 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded" href="/painel">Início</Link>
      <Link className="px-3 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded" href="/painel/usuarios">Usuários</Link>
      <Link className="px-3 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded" href="/painel/servicos">Serviços</Link>
      <Link className="px-3 py-2 bg-gray-800 hover:bg-gray-600 text-white rounded" href="/painel/clientes">Clientes</Link>
      {/* <Link href="#">Tarefas</Link> */}
      {/* <Link href="/painel/auditoria"><UserCheck size={20} color="#FFFFFF" /> Auditoria</Link> */}
    </>
  );
}