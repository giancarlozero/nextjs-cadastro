import CriarUsuarioForm from "@/app/components/criarusuarioform";
import Link from "next/link";

export default function NovoUsuario() {
  return(
    <>
      <CriarUsuarioForm />

      <Link href="/painel/usuarios">Cancelar</Link>
    </>
  );
}