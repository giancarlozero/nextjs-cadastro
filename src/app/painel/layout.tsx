import "@/app/ui/global.css";
import DashboardHeader from "@/app/components/ui/DashboardHeader";
import DashboardFooter from "../components/ui/DashboardFooter";

export default function PainelLayout({ children }: {children: React.ReactNode}) {
  return(
    <>
      <DashboardHeader />

      <div className="p-2">
        {children}
      </div>

      <DashboardFooter />
    </>
  );
}