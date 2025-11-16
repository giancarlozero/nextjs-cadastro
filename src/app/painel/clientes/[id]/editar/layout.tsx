import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Cliente | NextJS CRUD",
};

export default function ClientesLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="editar-cliente container-fluid">
      {children}
    </div>
  );
}