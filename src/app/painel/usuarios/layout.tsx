import type { Metadata } from "next";
import styles from '@/app/painel/painel.module.css'

export const metadata: Metadata = {
  title: "Cadastro de Usuários | NextJS CRUD",
};

export default function UsuariosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className={["container-fluid", styles.espacoCabecalhoRodape].join(" ")}>
      <div className="row">
        <div className="col-12 p-2 border rounded mb-2">
          <h2>Cadastro de usuários</h2>
        </div>
        <div className="col-12 p-0">
          {children}
        </div>
      </div>
    </div>
  );
}