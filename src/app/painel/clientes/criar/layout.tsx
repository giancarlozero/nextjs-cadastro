import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo Cliente | NextJS CRUD",
};

export default function UsuariosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="novo-usuario">
      {children}
    </div>
  );
}