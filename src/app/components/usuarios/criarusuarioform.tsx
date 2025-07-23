'use client'

import Link from "next/link";
import { criarUsuario } from "../../actions/usuarios";
import { useFormStatus } from "react-dom";
import styles from '@/app/painel/painel.module.css'

// Programação do botão de envio do formulário
function BotaoCriarUsuario() {
  const { pending } = useFormStatus()

  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? 'Criando usuário...' : 'Criar usuário'}
    </button>
  )
}

export default function CriarUsuarioForm() {
  return(
    <div className="secao-dados container-fluid my-3">
      <div className="dados row">
        <div className="col-12">
          <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
            <form action={criarUsuario}>
              <label htmlFor="nome">Nome completo</label>
              <input className="form-control" type="text" name="nome" id="nome" required />

              <label htmlFor="setor">Setor</label>
              <input className="form-control" type="text" name="setor" id="setor" required />

              <label htmlFor="cargo">Cargo</label>
              <input className="form-control" type="text" name="cargo" id="cargo" required />

              <label htmlFor="usuario">Nome de usuário</label>
              <input className="form-control" type="text" name="usuario" id="usuario" required />

              <label htmlFor="senha">Senha</label>
              <input className="form-control" type="password" name="senha" id="senha" required />

              <br/>

              <div className="row">
                <div className="col d-flex flex-row justify-content-between">
                  <div className="btn-group">
                    <Link className="btn btn-secondary" href="/painel/usuarios">Cancelar</Link>
                    <BotaoCriarUsuario />
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