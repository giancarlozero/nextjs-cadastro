'use client'

import { editarUsuario } from "@/app/actions/usuarios";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from '@/app/painel/painel.module.css'
import { useRouter } from "next/navigation";
import { useState } from "react";

type Usuario = {
  id: string;
  nome: string;
  sobrenome: string;
  setor: string;
  cargo: string;
};

export default function EditarUsuarioForm({ usuario }: { usuario: Usuario }) {
  const router = useRouter();

  const [nome, setNome] = useState(usuario.nome);
  const [sobrenome, setSobrenome] = useState(usuario.sobrenome);
  const [setor, setSetor] = useState(usuario.setor);
  const [cargo, setCargo] = useState(usuario.cargo);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("sobrenome", sobrenome);
    formData.append("setor", setor);
    formData.append("cargo", cargo);

    const res = await editarUsuario(usuario.id, formData);

    if (res.success === false) {
      toast.error(res.message);
    }
    toast.success(res.message);

    router.push("/painel/usuarios");

    setLoading(false);
  }

  return(
    <div className="secao-dados container-fluid my-3 p-0">
      <div className="dados row">
        <div className="col-12">
          <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
            <form onSubmit={handleSubmit}>
              {/* Nome do usuário como valor pré-preenchido */}
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />

              {/* Sobrenome do usuário como valor pré-preenchido */}
              <label htmlFor="sobrenome">Sobrenome</label>
              <input
                type="text"
                name="sobrenome"
                className="form-control"
                id="sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
              />

              {/* Setor do usuário como valor pré-preenchido */}
              <label htmlFor="setor">Setor</label>
              <input
                type="text"
                name="setor"
                className="form-control"
                id="setor"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
              />

              {/* Cargo do usuário como valor pré-preenchido */}
              <label htmlFor="cargo">Cargo</label>
              <input
                type="text"
                name="cargo"
                className="form-control"
                id="cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              />

              <br/>

              <div className="row">
                <div className="col d-flex flex-row justify-content-between">
                  <div className="btn-group">
                    <Link className="btn btn-secondary" href="/painel/usuarios">Cancelar</Link>
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