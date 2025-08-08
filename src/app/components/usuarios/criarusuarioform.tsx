'use client'

import Link from "next/link";
import { criarUsuario } from "../../actions/usuarios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from '@/app/painel/painel.module.css'

export default function CriarUsuarioForm() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await criarUsuario(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/painel/usuarios");
    } else {
      toast.error(res.message);
    }
  }

  return(
    <div className="secao-dados container-fluid my-3">
      <div className="dados row">
        <div className="col-12">
          <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
            <form onSubmit={handleSubmit}>
              <p>Nível de acesso</p>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="nivel_acesso" id="acesso-admin" value="Administrador" />
                <label className="form-check-label" htmlFor="nivel_acesso">Administrador</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="nivel_acesso" id="acesso-usuario" value="Usuário" />
                <label className="form-check-label" htmlFor="nivel_acesso">Usuário</label>
              </div><br />

              <label htmlFor="nome">Nome</label>
              <input className="form-control" type="text" name="nome" id="nome" required />

              <label htmlFor="sobrenome">Sobrenome</label>
              <input className="form-control" type="text" name="sobrenome" id="sobrenome" required />

              <label htmlFor="setor">Setor</label>
              <input className="form-control" type="text" name="setor" id="setor" required />

              <label htmlFor="cargo">Cargo</label>
              <input className="form-control" type="text" name="cargo" id="cargo" required />

              <label htmlFor="email">Endereço de mail</label>
              <input className="form-control" type="email" name="email" id="email" required />

              <label htmlFor="senha">Senha</label>
              <input className="form-control" type="password" name="senha" id="senha" required />

              <br/>

              <div className="row">
                <div className="col d-flex flex-row justify-content-between">
                  <div className="btn-group">
                    <Link className="btn btn-secondary" href="/painel/usuarios">Cancelar</Link>
                    <button className="btn btn-primary" type="submit">Criar usuário</button>
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