'use client'

import { apagarServico } from "@/app/actions/servicos";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Servico = {
  id: string;
}

export default function ApagarServicoForm({ servico }: { servico: Servico }) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await apagarServico(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/painel/servicos");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={servico.id} />

        <div className="flex flex-row gap-2 align-end justify-end-safe">
          <Link
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
            href="/painel/servicos"
          >Cancelar</Link>
          <button
            className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded"
            type="submit"
          >Apagar serviço</button>
        </div>
      </form>
    </>
  )
}