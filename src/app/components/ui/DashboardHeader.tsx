'use client'
import styles from '@/app/components/ui/dashboardheader.module.css';
import DashboardLogo from './DashboardLogo';
import DashboardNav from "./DashboardNav";
// import DashboardNavMobile from './DashboardNavMobile';
import SessionNav from "./SessionNav";

export default function DashboardHeader(){
  return(
    <header className={["container-fluid fixed-top", styles.cabecalho].join(" ")}>
      <div className="row">
        <div className={["col-2 d-flex flex-row align-items-center justify-content-start p-2", styles.logo].join(" ")}>
          <DashboardLogo />
        </div>
        <div className={["col d-flex flex-row align-items-center justify-content-center p-2", styles.topnav].join(" ")}>
          <DashboardNav />
        </div>
        <div className={["col-2 d-flex flex-row align-items-center justify-content-end p-2 gap-2", styles.userprofile].join(" ")}>
          <SessionNav />
        </div>
      </div>
    </header>
  );
}