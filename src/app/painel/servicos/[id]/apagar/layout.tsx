import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apagar Serviço | NextJS CRUD",
};

export default function ServicoDadosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="apagar-servico">
      {children}
    </div>
  );
}