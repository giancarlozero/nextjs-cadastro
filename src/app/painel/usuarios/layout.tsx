import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro de Usuários | NextJS CRUD",
};

export default function UsuariosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="usuarios">
      <h2>Lista de usuários</h2>

      <div>
        {children}
      </div>
    </div>
  );
}