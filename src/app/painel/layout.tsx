import styles from "@/app/painel/painel.module.css";
import DashboardHeader from "@/app/components/ui/DashboardHeader";
import DashboardFooter from "@/app/components/ui/DashboardFooter";

export default function PainelLayout({ children }: {children: React.ReactNode}) {
  return(
    <>
      <div className={[styles.espacamento].join(" ")}>
      <DashboardHeader />
        {children}
      <DashboardFooter />
      </div>
    </>
  );
}