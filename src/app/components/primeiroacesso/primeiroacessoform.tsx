'use client'

import { Card } from "../ui/shadcn/card"
import { Input } from "../ui/shadcn/input"
import { Button } from "../ui/shadcn/button"
import { FieldLabel } from "../ui/shadcn/field"
import { PasswordInput } from "../ui/multiform/passwordinput";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { criarPrimeiroAdmin } from "@/app/actions/conta";

export default function PrimeiroAcessoForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await criarPrimeiroAdmin(formData);

    setLoading(false);

    if(res?.errors) {
      const erros = res.errors;

      if("global" in erros) {
        toast.error(erros.global[0]);
      }

      Object.values(erros).forEach((lista) => {
        lista.forEach((msg) => toast.error(msg))
      });

      return;
    }

    toast.success("Administrador(a) do sistema criado(a) com sucesso. Por favor faça login para continuar.")

    setTimeout(() => { router.push("/") }, 1000);
  }

  return (
    <>
      <Card className="mb-3 p-3 w-full md:w-[45%] lg:w-[35%]">
        <form onSubmit={handleSubmit}>
          {/* Inserir o nível de acesso no campo oculto */}
          <input
            type="hidden"
            name="nivel_acesso"
            value="0"
          />

          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="w-full">
              <h2>Dados básicos</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="w-full">
              <FieldLabel>Nome</FieldLabel>
              <Input
                className=""
                type="text"
                name="nome"
                placeholder="Fulano"
              />
            </div>

            <div className="w-full">
              <FieldLabel>Sobrenome</FieldLabel>
              <Input
                className=""
                type="text"
                name="sobrenome"
                placeholder="de Tals"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="w-full">
              <FieldLabel>Setor</FieldLabel>
              <Input
                className=""
                type="text"
                name="setor"
                placeholder="Diretoria, Financeiro, Recursos Humanos, etc"
              />
            </div>

            <div className="w-full">
              <FieldLabel>Cargo</FieldLabel>
              <Input
                className=""
                type="text"
                name="cargo"
                placeholder="CEO, Gerente, Diretor(a) de Arte, etc"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="w-full">
              <h2>Credenciais de acesso de acesso</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="w-full">
              <FieldLabel>Endereço de email</FieldLabel>
              <Input
                className=""
                type="text"
                name="email"
                placeholder="exemplo@email.com"
              />
            </div>

            <div className="w-full">
              <FieldLabel>Senha</FieldLabel>
              <PasswordInput
                name="senha"
                placeholder="Letras, números e caracteres especiais"
              />
            </div>
          </div>

          <div className="flex flex-row gap-3 items-center justify-center">
            <Button
              className="text-white bg-gray-800"
              type="submit"
              disabled={loading}
              value=""
            >
            {loading ? "Criando..." : "Criar conta de Administrador(a)"}
            </Button>
          </div>
        </form>
      </Card>
    </>
  )
}