'use client'

import { Input } from "../ui/shadcn/input";
import { FieldLabel } from "../ui/shadcn/field";
import { Textarea } from "../ui/shadcn/textarea";

import Link from "next/link";
import { criarServico } from "@/app/actions/servicos";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from '@/app/painel/painel.module.css'

export default function CriarServicoForm() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await criarServico(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/painel/servicos");
    } else {
      toast.error(res.message);
    }
  }

  return(
    <div className={["secao-dados flex flex-col md:flex-row m-2 p-2 mb-3 gap-2 border rounded", styles.boxConteudo].join(" ")}>
      <div className="info w-full md:w-[40%]">
        <p>Preencha o formulário e crie um novo serviço neste sistema com os dados desejados. Defina aqui o título/nome do serviço, o preço a ser cobrado por ele e dê uma breve descrição do serviço para facilitar o entendimento.</p>
      </div>
      <div className="formulario w-full md:w-[60%]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-[50%]">
              <FieldLabel htmlFor="titulo">Título do serviço</FieldLabel>
              <Input className="w-full bg-white rounded p-2 mb-1" type="text" name="titulo" id="titulo" required />
            </div>

            <div className="w-full md:w-[50%]">
              <FieldLabel htmlFor="preco">Preço (em Reais)</FieldLabel>
              <Input className="w-full bg-white rounded p-2 mb-1" type="number" step="0.01" name="preco" id="preco" required />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full">
              <FieldLabel htmlFor="descricao">Descrição - OPCIONAL</FieldLabel>
              <Textarea name="descricao" className="w-full bg-white rounded p-2 mb-1" id="descricao" rows={5} />
            </div>
          </div>

          <div className="flex flex-row gap-2 align-end justify-end-safe">
            <Link
              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
              href="/painel/servicos"
            >Cancelar</Link>
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded"
              type="submit"
            >Criar serviço</button>
          </div>
        </form>
      </div>
    </div>
  );
}