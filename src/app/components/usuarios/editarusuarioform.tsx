'use client'

import { editarUsuario } from "../../actions/usuarios";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import styles from '@/app/painel/painel.module.css'

// Programação do botão de envio do formulário
function BotaoEditarUsuario() {
  const { pending } = useFormStatus()

  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? 'Salvando...' : 'Salvar alterações'}
    </button>
  )
}

// Coleta o ID e os dados básicos do usuário a ser editado
type EditarUsuarioProps = {
  usuarioId: string;
  dadosUsuario: {
    nome: string,
    setor: string,
    cargo: string
  }
}

export default function EditarUsuarioForm({ usuarioId, dadosUsuario }: EditarUsuarioProps) {
  // Define usuário a ser editado com base em seu ID
  const EditarUsuarioComId = editarUsuario.bind(null, usuarioId)

  return(
    <div className="secao-dados container-fluid my-3">
      <div className="dados row">
        <div className="col-12">
          <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
            <form action={EditarUsuarioComId}>
              {/* Nome do usuário como valor padrão, pré-preenchido */}
              <label htmlFor="nome">Nome completo</label>
              <input type="text" name="nome" className="form-control" id="nome" defaultValue={dadosUsuario.nome} />

              {/* Setor do usuário como valor padrão, pré-preenchido */}
              <label htmlFor="setor">Setor</label>
              <input type="text" name="setor" className="form-control" id="setor" defaultValue={dadosUsuario.setor} />

              {/* Cargo do usuário como valor padrão, pré-preenchido */}
              <label htmlFor="cargo">Cargo</label>
              <input type="text" name="cargo" className="form-control" id="cargo" defaultValue={dadosUsuario.cargo} />

              <br/>

              <div className="row">
                <div className="col d-flex flex-row justify-content-between">
                  <div className="btn-group">
                    <Link className="btn btn-secondary" href="/painel/usuarios">Cancelar</Link>
                    <BotaoEditarUsuario />
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