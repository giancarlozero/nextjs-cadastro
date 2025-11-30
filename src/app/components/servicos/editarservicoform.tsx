'use client'

import { editarServico } from "@/app/actions/servicos";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from '@/app/painel/painel.module.css'
import { useRouter } from "next/navigation";
import { useState } from "react";

type Servico = {
  id: string;
  titulo: string;
  preco: string;
  descricao: string;
};

export default function EditarServicoForm({ servico }: { servico: Servico }) {
  const router = useRouter();

  const [titulo, setTitulo] = useState(servico.titulo);
  const [preco, setPreco] = useState(servico.preco);
  const [descricao, setDescricao] = useState(servico.descricao);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("preco", preco);
    formData.append("descricao", descricao);

    const res = await editarServico(servico.id, formData);

    if (res.success === false) {
      toast.error(res.message);
    }
    toast.success(res.message);

    router.push("/painel/servicos");

    setLoading(false);
  }

  return(
    <div className={["secao-dados flex flex-col md:flex-row m-2 p-2 mb-3 gap-2 border rounded", styles.boxConteudo].join(" ")}>
      <div className="info w-full md:w-[40%]">
        <p>Edite os valores dos campos desejados no formulário para atualizar as informações deste serviço.</p>
      </div>
      <div className="formulario w-full md:w-[60%]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full md:w-[50%]">
              {/* Título do serviço como valor pré-preenchido */}
              <label htmlFor="titulo">Título do serviço</label>
              <input type="text" name="titulo" className="w-full bg-white rounded p-2 mb-1" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>

            <div className="w-full md:w-[50%]">
              {/* Preço cobrado pelo serviço como valor pré-preenchido */}
              <label htmlFor="preco">Preço (em R$)</label>
              <input type="number" name="preco" className="w-full bg-white rounded p-2 mb-1" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full">
              {/* Descrição do serviço como valor pré-preenchido */}
              <label htmlFor="descricao">Descrição - OPCIONAL</label>
              <textarea name="descricao" className="w-full bg-white rounded p-2 mb-1" id="descricao" value={descricao} rows={5} onChange={(e) => setDescricao(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-row gap-2 align-end justify-end-safe">
            <Link className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded" href="/painel/servicos">Cancelar</Link>
            <button className="bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded" type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}