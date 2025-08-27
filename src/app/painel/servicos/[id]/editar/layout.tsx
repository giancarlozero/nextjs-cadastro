import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Serviço | NextJS CRUD",
};

export default function ServicosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="editar-servico container-fluid">
      {children}
    </div>
  );
}