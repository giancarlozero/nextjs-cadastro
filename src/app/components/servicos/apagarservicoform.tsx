'use client'

import { apagarUsuario } from "@/app/actions/usuarios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Usuario = {
  id: string;
}

export default function ApagarUsuarioForm({ usuario }: { usuario: Usuario }) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await apagarUsuario(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/painel/usuarios");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={usuario.id} />

        <div className="row">
          <div className="col d-flex flex-row justify-content-between">
            <div className="btn-group">
              <Link className="btn btn-secondary" href="/painel/usuarios">Cancelar</Link>
              <button className="btn btn-danger" type="submit">Apagar usuário</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}