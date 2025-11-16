import DashboardHeader from "@/app/components/ui/DashboardHeader";
import DashboardFooter from "@/app/components/ui/DashboardFooter";

export default function UsuariosLayout({ children }: {children: React.ReactNode}) {
  return(
    <>
      <DashboardHeader />

      {children}

      <DashboardFooter />
    </>
  );
}