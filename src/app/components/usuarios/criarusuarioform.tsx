'use client'

import { Input } from "../ui/shadcn/input";
import { PasswordInput } from "../ui/multiform/passwordinput";
import { FieldLabel } from "../ui/shadcn/field";
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
    <div className={["secao-dados flex flex-col md:flex-row m-2 p-2 mb-3 gap-2 border rounded", styles.boxConteudo].join(" ")}>
      <div className="info w-full md:w-[40%]">
        <p>Preencha o formulário e crie um novo usuário neste sistema com os dados desejados. Defina aqui o nome de usuário e senha, além de definir se o usuário será um administrador ou um usuário comum, além de definir o setor onde ele(a) atuará e o cargo a ser exercido.</p>

        <p><strong>Todos os campos são obrigatórios.</strong></p>
      </div>
      <div className="formulario w-full md:w-[60%]">
        <form onSubmit={handleSubmit}>

          <fieldset className="mb-3">
            <p><strong>Nível de acesso</strong></p>

            <div className="flex flex-col">
              <div className="w-full md:w-[50%]">
                <input type="radio" name="nivel_acesso" id="acesso-admin" value="0" />
                <label htmlFor="nivel_acesso">Administrador</label>
              </div>
              <div className="w-full md:w-[50%]">
                <input type="radio" name="nivel_acesso" id="acesso-usuario" value="1" />
                <label htmlFor="nivel_acesso">Usuário</label>
              </div>
            </div>
          </fieldset>

          <fieldset className="mb-3">
            <p><strong>Dados básicos</strong></p>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-[50%]">
                <FieldLabel htmlFor="nome">Nome</FieldLabel>
                <Input className="w-full bg-white rounded p-2 mb-1" type="text" name="nome" id="nome" required />
              </div>

              <div className="w-full md:w-[50%]">
                <FieldLabel htmlFor="sobrenome">Sobrenome</FieldLabel>
                <Input className="w-full bg-white rounded p-2 mb-1" type="text" name="sobrenome" id="sobrenome" required />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-[50%]">
                <FieldLabel htmlFor="setor">Setor</FieldLabel>
                <Input className="w-full bg-white rounded p-2 mb-1" type="text" name="setor" id="setor" required />
              </div>
              <div className="w-full md:w-[50%]">
                <FieldLabel htmlFor="cargo">Cargo</FieldLabel>
                <Input className="w-full bg-white rounded p-2 mb-1" type="text" name="cargo" id="cargo" required />
              </div>
            </div>
          </fieldset>

          <fieldset className="mb-3">
            <p><strong>Credenciais de acesso</strong></p>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-[50%]">
                <FieldLabel htmlFor="email">Endereço de mail</FieldLabel>
                <Input className="w-full bg-white rounded p-2 mb-1" type="email" name="email" id="email" required />
              </div>
              <div className="w-full md:w-[50%]">
                <FieldLabel htmlFor="senha">Senha</FieldLabel>
                {/* <Input className="w-full bg-white rounded p-2 mb-1" type="password" name="senha" id="senha" required /> */}
                <PasswordInput
                  className="w-full bg-white rounded p-2"
                  name="senha"
                  id="senha"
                  placeholder="Letras, números e caracteres especiais"
                  required
                />
              </div>
            </div>
          </fieldset>

          <div className="flex flex-row gap-2 align-end justify-end-safe">
            <Link
              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
              href="/painel/usuarios"
            >Cancelar</Link>
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded"
              type="submit"
            >Criar usuário</button>
          </div>
        </form>
      </div>
    </div>
  );
}