import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo Serviço | NextJS CRUD",
};

export default function ServicosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="novo-servico">
      {children}
    </div>
  );
}