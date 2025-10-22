'use client'

import styles from "@/app/components/ui/dashboardfooter.module.css"

export default function DashboardFooter(){
  return(
    <footer className={["w-screen bottom-0 flex flex-row justify-center fixed", styles.rodape].join(" ")}>
      <div>
        <p>Rodapé</p>
      </div>
    </footer>
  );
}