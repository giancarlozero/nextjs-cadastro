import styles from "@/app/painel/painel.module.css"
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import ApagarClienteForm from "@/app/components/clientes/apagarclienteform";

type ClienteApagadoProps = {
  params: {
    id: string
  }
}

export default async function ConfirmarApagarCliente({ params }: ClienteApagadoProps) {
  // Define serviço a ser apagado com base em seu ID
  const { id } = await params;
  const cliente = await prisma.cliente.findUnique({
    where: { id: id }
  });

  // Se o serviço não for encontrado no banco de dados, redirecione para a lista de serviços
  if(!cliente) {
    redirect('/painel/clientes?encontrado=0');
  }

  return (
    <>
      <div className={["secao-titulo m-2 p-2 border rounded", styles.boxConteudo].join(" ")}>
        <h1>Apagar serviço</h1>
      </div>

      <div className="secao-dados container-fluid p-2">
        <div className="dados row g-3">
          <div className="col">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <p>Você deseja apagar o cliente <strong>{cliente.nome}</strong> do sistema?</p>

              <ul>
                <li>Nome ou Razão Social: <strong>{cliente.nome}</strong></li>
                <li>CPF ou CNPJ: <strong>{cliente.documento}</strong></li>
                <li>Valor contratado: <strong>R$ {cliente.valor?.toFixed(2)}</strong></li>
                <li>Descrição: <strong>{cliente.descricao}</strong></li>
              </ul>

              <div className="w-fit block bg-red-700 p-2 my-2 rounded">
                <p className="text-white mt-2"><strong>ATENÇÃO: esta ação é irreversível.</strong> Recomenda-se fazer um backup antes de apagar quaisquer dados.</p>
              </div>

              <ApagarClienteForm cliente={cliente} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}