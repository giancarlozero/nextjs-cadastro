'use client'

import { Input } from "../ui/shadcn/input";
import { FieldLabel } from "../ui/shadcn/field";
import { Textarea } from "../ui/shadcn/textarea";
import CriarClientesDescricao from "./criarclientesdescricao";
import { useState, useEffect } from "react";
import { criarCliente } from "@/app/actions/clientes";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import styles from '@/app/painel/painel.module.css'

async function obterServicos() {
  const res = await fetch("/api/servicos");
  return res.json();
}

export default function CriarClienteForm() {
  const router = useRouter();

  const [servicos, setServicos] = useState<any[]>([]);
  const [selecionados, setSelecionados] = useState<Record<string, {preco: number, quantidade: number}>>({});
  const [total, setTotal] = useState<number>(0);

  // Busca inicial de serviços
  useEffect(() => {
    obterServicos().then(setServicos)
  }, []);

  // Atualiza o total de acordo com a seleção de serviços feita pelo usuário
  useEffect(() => {
    const novoTotal = Object.entries(selecionados).reduce(
      (acc, [, { preco, quantidade }]) => acc + preco * quantidade,
      0
    );
    setTotal(novoTotal);
  }, [selecionados]);

  const alternarServico = (id: string, preco: number, checked: boolean) => {
    setSelecionados((prev) => {
      const novo = { ...prev };
      if (checked) novo[id] = { preco, quantidade: 1 };
      else delete novo[id];
      return novo;
    });
  }

  const alterarQtd = (id: string, quantidade: number) => {
    setSelecionados((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantidade }
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const servicosSelecionados = Object.entries(selecionados).map(([id, { preco, quantidade }]) => ({
      id,
      preco,
      quantidade,
    }));
    formData.append("servicosSelecionados", JSON.stringify(servicosSelecionados));

    const res = await criarCliente(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/painel/clientes");
    } else {
      toast.error(res.message);
    }
  }

  return(<>
    <div className={["secao-dados flex flex-col md:flex-row m-2 p-2 mb-3 gap-2 border rounded", styles.boxConteudo].join(" ")}>
      <div className="info w-[100%] md:w-[40%]">
        <CriarClientesDescricao />
      </div>
      <div className="formulario w-[100%] md:w-[60%]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-[100%] md:w-[50%]">
              <FieldLabel htmlFor="titulo">Nome completo ou Razão Social</FieldLabel>
              <Input className="w-full bg-white rounded p-2 mb-1" type="text" name="nome" id="nome" required />
            </div>

            <div className="w-[100%] md:w-[50%]">
              <FieldLabel htmlFor="preco">Documento (CPF ou CNPJ)</FieldLabel>
              <Input className="w-full bg-white rounded p-2 mb-1" type="text" name="documento" id="documento" required />
            </div>
          </div>

          <div className="mt-4">
            <FieldLabel>Serviço(s) contratado(s) - OPCIONAL</FieldLabel>
            <div className="flex flex-col gap-2 bg-gray-50 p-2 rounded border">
              {servicos.length === 0 && <p>Nenhum serviço cadastrado.</p>}
              {servicos.map((s) => (
                <div key={s.id} className="flex items-center justify-between border-b py-1">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={(e) => alternarServico(s.id, s.preco, e.target.checked)}
                    />
                    <span>{s.titulo}</span>
                  </label>

                  {selecionados[s.id] && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        value={selecionados[s.id].quantidade}
                        onChange={(e) => alterarQtd(s.id, Number(e.target.value))}
                        className="w-16 text-center"
                      />
                      <span className="text-sm text-gray-600">
                        x R${s.preco.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex justify-end items-center gap-2">
            <strong>Total:</strong> <span>R$ {total.toFixed(2)}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-[100%]">
              <FieldLabel htmlFor="descricao">Descrição do cliente - OPCIONAL</FieldLabel>
              <Textarea name="descricao" className="w-full bg-white rounded p-2 mb-1" id="descricao" rows={5} />
            </div>
          </div>

          <div className="flex flex-row gap-2 align-end justify-end-safe">
            <Link
              className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded"
              href="/painel/clientes"
            >Cancelar</Link>
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded"
              type="submit"
            >Criar cliente</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}