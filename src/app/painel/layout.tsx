import "@/app/ui/global.css";
import TopNav from "../components/topnav";

export default function PainelLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="painel-inicio">
      <TopNav />
      <h1>Painel de controle</h1>

      <div>
        {children}
      </div>
    </div>
  );
}