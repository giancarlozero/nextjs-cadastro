'use client'
import { useFormStatus } from "react-dom";

export default function EditarUsuarioForm() {
  return(
    <form>
      <label htmlFor="nome">Nome completo
        <input type="text" name="nome" id="nome" required />
      </label>
      <label htmlFor="setor">Setor
        <input type="text" name="setor" id="setor" required />
      </label>
      <label htmlFor="cargo">Cargo
        <input type="text" name="cargo" id="cargo" required />
      </label>
      <button>Salvar alterações</button>
    </form>
  );
}