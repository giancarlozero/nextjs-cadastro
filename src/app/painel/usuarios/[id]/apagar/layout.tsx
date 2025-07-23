import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apagar Usuário | NextJS CRUD",
};

export default function UsuarioDadosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="apagar-usuario">
      {children}
    </div>
  );
}