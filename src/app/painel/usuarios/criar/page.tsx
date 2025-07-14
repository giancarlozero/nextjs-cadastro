import CriarUsuarioForm from "@/app/components/usuarios/criarusuarioform";
import Link from "next/link";

export default function NovoUsuario() {
  return(
    <>
      <CriarUsuarioForm />

      <Link href="/painel/usuarios">Cancelar</Link>
    </>
  );
}