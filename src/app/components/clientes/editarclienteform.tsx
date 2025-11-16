'use client'

import { Input } from "../ui/shadcn/input";
import { FieldLabel } from "../ui/shadcn/field";
import { Textarea } from "../ui/shadcn/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/shadcn/table"
import EditarClienteDescricao from "./editarclientedescricao";
import { editarCliente } from "@/app/actions/clientes";
import Link from "next/link";
import { toast } from "react-toastify";
import styles from '@/app/painel/painel.module.css'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarClienteForm({ cliente, listaServicos =[] }: any) {
  const router = useRouter();

  const [nome, setNome] = useState(cliente.nome);
  const [documento, setDocumento] = useState(cliente.documento);
  const [descricao, setDescricao] = useState(cliente.descricao || '');
  const [selecionados, setSelecionados] = useState<Record<string, {preco:number, quantidade:number}>>({});
  const [total, setTotal] = useState<number>(cliente.valor || 0);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const inicial: Record<string, {preco:number, quantidade:number}> = {};
    (cliente.servicos || []).forEach((serv: any) => {
      inicial[serv.id] = { preco: serv.preco, quantidade: serv.quantidade };
    });
    setSelecionados(inicial)
  }, [cliente]);

  useEffect(() => {
    const novoTotal = Object.entries(selecionados).reduce(
      (acc, [, { preco, quantidade }]) => acc + preco * quantidade, 0
    );
    setTotal(novoTotal);
  }, [selecionados]);

  const alternarServico = (id: string, preco: number, marcado: boolean) => {
    setSelecionados((prev) => {
      const novo = { ...prev };
      if (marcado) novo[id] = { preco, quantidade: 1 };
      else delete novo[id];
      return novo;
    });
  }

  const alterarQtd = (id:string, quantidade: number) => {
    setSelecionados((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantidade }
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('documento', documento);
    formData.append('descricao', descricao);

    const servicosSelecionados = Object.entries(selecionados).map(([id, {preco, quantidade}]) =>({
      id,
      preco,
      quantidade,
    }));
    formData.append("servicosSelecionados", JSON.stringify(servicosSelecionados));

    const res = await editarCliente(cliente.id, formData);

    if(res.success === false) {
      toast.error(res.message);
    }
    toast.success(res.message);

    router.push("/painel/clientes");

    setLoading(false);
  }

  return(
    <div className={["secao-dados flex flex-col md:flex-row m-2 p-2 mb-3 gap-2 border rounded", styles.boxConteudo].join(" ")}>
      <div className="info w-[100%] md:w-[40%]">
        <EditarClienteDescricao />
      </div>
      <div className="formulario w-[100%] md:w-[60%]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-[100%] md:w-[50%]">
              {/* Título do serviço como valor pré-preenchido */}
              <FieldLabel htmlFor="nome">Nome completo ou Razão Social</FieldLabel>
              <Input
                type="text"
                name="nome"
                className="w-full bg-white rounded p-2 mb-1"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="w-[100%] md:w-[50%]">
              {/* Preço cobrado pelo serviço como valor pré-preenchido */}
              <FieldLabel htmlFor="documento">Documento (CPF ou CNPJ)</FieldLabel>
              <Input
                type="text"
                name="documento"
                className="w-full bg-white rounded p-2 mb-1"
                id="documento"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
            </div>
          </div>

          <div className="p-3 my-3 bg-white rounded">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Serviço contratado</TableHead>
                  <TableHead>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listaServicos?.map((serv:any) => {
                  const marcado = Boolean(selecionados[serv.id]);
                  return (
                  <TableRow key={serv.id}>
                    <TableCell>
                      <input type="checkbox" checked={marcado} onChange={(e) => alternarServico(serv.id, serv.preco, e.target.checked)} /> {serv.titulo} - R$ {serv.preco.toFixed(2)}
                    </TableCell>
                    <TableCell>{marcado && ( <input className="p-0" type="number" min={1} value={selecionados[serv.id].quantidade} onChange={(e) => alterarQtd(serv.id, Number(e.target.value))} /> )}</TableCell>
                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>

            <div className="flex flex-col md:flex-row justify-end gap-3">
              <p className="text-green-700">Total: <strong>R$ {total.toFixed(2)}</strong></p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-[100%]">
              {/* Descrição do serviço como valor pré-preenchido */}
              <FieldLabel htmlFor="descricao">Descrição - OPCIONAL</FieldLabel>
              <Textarea
                name="descricao"
                className="w-full bg-white rounded p-2 mb-1"
                id="descricao"
                value={descricao}
                rows={5}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-row gap-2 align-end justify-end-safe">
            <Link className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded" href="/painel/clientes">Cancelar</Link>
            <button className="bg-green-700 hover:bg-green-800 text-white px-2 py-1 rounded" type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}