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

        <div className="flex flex-row gap-2 align-end justify-end-safe">
          <Link
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
            href="/painel/usuarios"
          >Cancelar</Link>
          <button
            className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded"
            type="submit"
          >Apagar usuário</button>
        </div>
      </form>
    </>
  )
}