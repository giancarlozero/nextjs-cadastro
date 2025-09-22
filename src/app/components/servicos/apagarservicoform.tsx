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

        <div className="row">
          <div className="col d-flex flex-row justify-content-between">
            <div className="btn-group">
              <Link className="btn btn-secondary" href="/painel/servicos">Cancelar</Link>
              <button className="btn btn-danger" type="submit">Apagar serviço</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}