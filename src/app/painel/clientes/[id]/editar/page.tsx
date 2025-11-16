import styles from "@/app/painel/painel.module.css"
import EditarClienteForm from "@/app/components/clientes/editarclienteform";
import { prisma } from "@/app/lib/prisma";

export default async function EditarCliente({ params: { id } }: { params: { id: string } }) {
  const cliente = await prisma.cliente.findUnique({
    where: { id },
    include: {
      servicos: {
        include: {
          servico: true
        }
      }
    }
  });

  const listaServicos = await prisma.servico.findMany({
    orderBy: { titulo: "asc" },
  });

  if(!cliente) {
    return <p>Cliente não encontrado.</p>
  }

  const clienteDados = {
    ...cliente,
    servicos: cliente.servicos.map((cs) => ({
      id: cs.servico.id,
      titulo: cs.servico.titulo,
      preco: cs.servico.preco,
      quantidade: cs.quantidade,
    })),
  }

  const servicosDados = listaServicos.map(serv => ({
    id: serv.id,
    titulo: serv.titulo,
    preco: serv.preco
  }));

  return(
    <>
      <div className={["secao-titulo m-2 p-2 border rounded", styles.boxConteudo].join(" ")}>
        <h1>Edição de clientes</h1>
      </div>

      <EditarClienteForm cliente={clienteDados} listaServicos={servicosDados} />
    </>
  );
}