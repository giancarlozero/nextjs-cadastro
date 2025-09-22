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
    <div className="secao-dados container-fluid my-3 p-0">
      <div className="dados row">
        <div className="col-12">
          <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
            <form onSubmit={handleSubmit}>
              {/* Título do serviço como valor pré-preenchido */}
              <label htmlFor="titulo">Título do serviço</label>
              <input type="text" name="titulo" className="form-control" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

              {/* Preço cobrado pelo serviço como valor pré-preenchido */}
              <label htmlFor="preco">Preço (em R$)</label>
              <input type="number" name="preco" className="form-control" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} />

              {/* Descrição do serviço como valor pré-preenchido */}
              <label htmlFor="descricao">Descrição</label>
              <textarea name="descricao" className="form-control" id="descricao" rows="5" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

              <br/>

              <div className="row">
                <div className="col d-flex flex-row justify-content-between">
                  <div className="btn-group">
                    <Link className="btn btn-secondary" href="/painel/servicos">Cancelar</Link>
                    <button className="btn btn-primary" type="submit" disabled={loading}>
                      {loading ? "Salvando..." : "Salvar alterações"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}