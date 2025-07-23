import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editar Usuário | NextJS CRUD",
};

export default function UsuariosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="editar-usuario container-fluid">
      {children}
    </div>
  );
}