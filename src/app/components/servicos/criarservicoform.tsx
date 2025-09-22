'use client'

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
    <div className="secao-dados container-fluid my-3 p-0">
      <div className="dados row">
        <div className="col-12">
          <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nome">Título do serviço</label>
              <input className="form-control" type="text" name="titulo" id="titulo" required />

              <label htmlFor="setor">Preço (em Reais)</label>
              <input className="form-control" type="number" step="0.01" name="preco" id="preco" required />

              <label htmlFor="sobrenome">Descrição</label>
              <input className="form-control" type="textarea" name="descricao" id="descricao" required />

              <br/>

              <div className="row">
                <div className="col d-flex flex-row justify-content-between">
                  <div className="btn-group">
                    <Link className="btn btn-secondary" href="/painel/servicos">Cancelar</Link>
                    <button className="btn btn-primary" type="submit">Criar serviço</button>
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