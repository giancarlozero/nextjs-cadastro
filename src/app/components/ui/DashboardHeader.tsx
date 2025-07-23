'use client'
import styles from '@/app/components/ui/dashboardheader.module.css';
import Logo from "./DashboardLogo";
import DashboardNav from "./DashboardNav";
import SessionNav from "./SessionNav";
import DashboardNavMobile from './DashboardNavMobile';

export default function DashboardHeader(){
  return(
    <header className={["container-fluid position-fixed top-0 z-2", styles.cabecalho].join(" ")}>
      <div className="row d-flex d-md-none">
        <div className="col-12 col-md-2 d-flex flex-row align-items-center justify-content-center p-2">
          <Logo />
        </div>
        <div className="col d-flex flex-row align-items-center justify-content-center p-2">
          <DashboardNavMobile />
        </div>
      </div>

      <div className="row d-none d-md-flex">
        <div className="col-12 col-md-2 d-flex flex-row align-items-center justify-content-center p-2">
          <Logo />
        </div>
        <div className="col d-flex flex-row align-items-center justify-content-center p-2">
          <DashboardNav />
        </div>
        <div className="col-12 col-md-2 d-flex flex-row align-items-center justify-content-center p-2">
          <SessionNav />
        </div>
      </div>
    </header>
  );
}