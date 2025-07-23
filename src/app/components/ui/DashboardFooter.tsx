'use client'

import styles from "@/app/components/ui/dashboardfooter.module.css"

export default function DashboardFooter(){
  return(
    <footer className={["container-fluid position-fixed bottom-0 z-2", styles.rodape].join(" ")}>
      <div className="row p-3">
        <div className="col d-flex flex-row align-items-center justify-content-center">
          <p>Rodapé</p>
        </div>
      </div>
    </footer>
  );
}