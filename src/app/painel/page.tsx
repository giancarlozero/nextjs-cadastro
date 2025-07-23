import type { Metadata } from "next";
import styles from '@/app/painel/painel.module.css'

export const metadata: Metadata = {
  title: "Painel de Controle | NextJS CRUD"
};

export default function Inicio() {
  return(
    <div className={["container-fluid", styles.espacoCabecalhoRodape].join(" ")}>
      <div className="row g-2">
        <div className="col-12">
          <h1>Painel de controle</h1>
        </div>
        <div className="col-12 p-2 border rounded">
          <p>Dados do painel de controle, gráficos, etc</p>
        </div>
      </div>

      <div className="row g-2">
        <div className={["col p-2 border rounded", styles.minAltura25].join(" ")}>
          <p>Teste</p>
        </div>
        <div className={["col p-2 border rounded", styles.minAltura25].join(" ")}>
          <p>Teste</p>
        </div>
        <div className={["col p-2 border rounded", styles.minAltura25].join(" ")}>
          <p>Teste</p>
        </div>
        <div className={["col p-2 border rounded", styles.minAltura25].join(" ")}>
          <p>Teste</p>
        </div>
      </div>
      <div className="row">
        <div className={["col p-2 border rounded", styles.minAltura50].join(" ")}>
          <p>Teste</p>
        </div>
        <div className={["col p-2 border rounded", styles.minAltura50].join(" ")}>
          <p>Teste</p>
        </div>
      </div>
    </div>
  );
}