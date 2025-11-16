'use client'

import { apagarCliente } from "@/app/actions/clientes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Cliente = {
  id: string;
}

export default function ApagarClienteForm({ cliente }: { cliente: Cliente }) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await apagarCliente(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/painel/clientes");
    } else {
      toast.error(res.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={cliente.id} />

        <div className="flex flex-row gap-2 align-end justify-end-safe">
          <Link
            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
            href="/painel/clientes"
          >Cancelar</Link>
          <button
            className="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded"
            type="submit"
          >Apagar cliente</button>
        </div>
      </form>
    </>
  )
}