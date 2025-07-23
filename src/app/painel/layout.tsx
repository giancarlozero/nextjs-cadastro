import styles from "@/app/painel/painel.module.css";
import DashboardHeader from "@/app/components/ui/DashboardHeader";
import DashboardFooter from "@/app/components/ui/DashboardFooter";

export default function PainelLayout({ children }: {children: React.ReactNode}) {
  return(
    <>
      <DashboardHeader />

      <div className="area-geral container-fluid">
        <div className="row">
          <div className="col-12">

            <div className={["p-2", styles.espacamento].join(" ")}>
              {children}
            </div>

          </div>
        </div>
      </div>

      <DashboardFooter />
    </>
  );
}