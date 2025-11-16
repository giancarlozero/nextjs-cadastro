'use client'

import styles from '@/app/components/ui/dashboardheader.module.css';
import DashboardLogo from './DashboardLogo';
import DashboardNav from "./DashboardNav";
import SessionNav from "./SessionNav";

export default function DashboardHeader(){
  return(
    <header className={["w-screen top-0 flex flex-row items-center justify-center fixed", styles.cabecalho].join(" ")}>
      <div className={["p-2", styles.logo].join(" ")}>
        <DashboardLogo />
      </div>
      <div className={["grow p-2", styles.topnav].join(" ")}>
        <nav className={["flex flex-row gap-1.5 items-center justify-center ", styles.navegacao].join(" ")}>
          <DashboardNav />
        </nav>
      </div>
      <div className={["p-2 gap-2", styles.userprofile].join(" ")}>
        <SessionNav />
      </div>
    </header>
  );
}