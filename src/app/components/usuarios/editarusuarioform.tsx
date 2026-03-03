'use client'

import { Input } from "../ui/shadcn/input";
import { FieldLabel } from "../ui/shadcn/field";

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
    <div className={["secao-dados flex flex-col md:flex-row m-2 p-2 mb-3 gap-2 border rounded", styles.boxConteudo].join(" ")}>
      <div className="info w-full md:w-[40%]">
        <p>Edite os valores dos campos desejados no formulário para atualizar as informações deste(a) usuário(a)</p>

        <p>Somente o(a) próprio(a) usuário(a) ou um(a) administrador(a) poderá alterar sua senha de acesso ao sistema.</p>

        <p><strong>Todos os campos são obrigatórios.</strong></p>
      </div>

      <div className="formulario w-full md:w-[60%]">
        <form onSubmit={handleSubmit}>
          <fieldset className="mb-3">
            <p><strong>Dados básicos</strong></p>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-[50%]">
                <FieldLabel htmlFor="nome">Nome</FieldLabel>
                <Input
                    type="text"
                    name="nome"
                    className="w-full bg-white rounded p-2 mb-1"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
              </div>

              <div className="w-full md:w-[50%]">
                <FieldLabel htmlFor="sobrenome">Sobrenome</FieldLabel>
                <Input
                  type="text"
                  name="sobrenome"
                  className="w-full bg-white rounded p-2 mb-1"
                  id="sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-[50%]">
                {/* Setor do usuário como valor pré-preenchido */}
                <FieldLabel htmlFor="setor">Setor</FieldLabel>
                <Input
                  type="text"
                  name="setor"
                  className="w-full bg-white rounded p-2 mb-1"
                  id="setor"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                />
              </div>

              <div className="w-full md:w-[50%]">
                {/* Cargo do usuário como valor pré-preenchido */}
                <FieldLabel htmlFor="cargo">Cargo</FieldLabel>
                <Input
                  type="text"
                  name="cargo"
                  className="w-full bg-white rounded p-2 mb-1"
                  id="cargo"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                />
              </div>
            </div>
          </fieldset>

          <div className="flex flex-row gap-2 align-end justify-end-safe">
            <Link className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded" href="/painel/usuarios">Cancelar</Link>
            <button className="bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded" type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}