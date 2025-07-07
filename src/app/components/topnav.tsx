'use client'

import Logo from "./logo";
import styles from './topnav.module.css';
import Link from "next/link";

export default function TopNav(){
  return(
    <div className={styles.topnav}>
      <Logo />
      <nav>
        <ul className={styles.nav}>
          <li></li>
          <li><Link href="/painel">Início</Link></li>
          <li><Link href="/painel/usuarios">Usuários</Link></li>
          {/* <li><Link href="/painel/clientes">Clientes</Link></li>
          <li><Link href="/painel/tarefas">Tarefas</Link></li> */}
          <li><Link href="/">Encerrar sessão</Link></li>
        </ul>
      </nav>
    </div>
  );
}