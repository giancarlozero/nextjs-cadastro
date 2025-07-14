'use client'

import { criarUsuario } from "../../actions/usuarios";
import { useFormStatus } from "react-dom";

// Programação do botão de envio do formulário
function BotaoCriarUsuario() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
    >
      {pending ? 'Criando usuário...' : 'Criar usuário'}
    </button>
  )
}

export default function CriarUsuarioForm() {
  return(
    <form action={criarUsuario}>
      <label htmlFor="nome">Nome completo
        <input type="text" name="nome" id="nome" required />
      </label>
      <label htmlFor="setor">Setor
        <input type="text" name="setor" id="setor" required />
      </label>
      <label htmlFor="cargo">Cargo
        <input type="text" name="cargo" id="cargo" required />
      </label>
      <label htmlFor="usuario">Nome de usuário
        <input type="text" name="usuario" id="usuario" required />
      </label>
      <label htmlFor="senha">Senha
        <input type="password" name="senha" id="senha" required />
      </label>
      <BotaoCriarUsuario />
    </form>
  );
}