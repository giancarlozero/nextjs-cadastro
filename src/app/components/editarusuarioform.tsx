'use client'

import { editarUsuario } from "../actions/usuarios";
import { useFormStatus } from "react-dom";

// Programação do botão de envio do formulário
function BotaoEditarUsuario() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
    >
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

  // console.log('[editarUsuario] usuarioId:', usuarioId );

  return(
    <form action={EditarUsuarioComId}>
      <label htmlFor="nome">Nome completo
        <input
          type="text"
          name="nome"
          id="nome"
          defaultValue={dadosUsuario.nome} // Nome do usuário como valor padrão, pré-preenchido
        />
      </label>
      <label htmlFor="setor">Setor
        <input
          type="text"
          name="setor"
          id="setor"
          defaultValue={dadosUsuario.setor} // Setor do usuário como valor padrão, pré-preenchido
        />
      </label>
      <label htmlFor="cargo">Cargo
        <input
          type="text"
          name="cargo"
          id="cargo"
          defaultValue={dadosUsuario.cargo} // Cargo do usuário como valor padrão, pré-preenchido
        />
      </label>
      <BotaoEditarUsuario />
    </form>
  );
}