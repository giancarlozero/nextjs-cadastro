import styles from "@/app/painel/painel.module.css"
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import ApagarServicoForm from "@/app/components/servicos/apagarservicoform";

type ServicoApagadoProps = {
  params: {
    id: string
  }
}

export default async function ConfirmarApagarServico({ params }: ServicoApagadoProps) {
  // Define serviço a ser apagado com base em seu ID
  const { id } = await params;
  const servico = await prisma.servico.findUnique({
    where: { id: id }
  });

  // Se o serviço não for encontrado no banco de dados, redirecione para a lista de serviços
  if(!servico) {
    redirect('/painel/servicos?encontrado=0');
  }

  return (
    <>
      <div className="secao-titulo container-fluid p-0">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h1>Apagar serviço</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="secao-dados container-fluid my-3 p-0 p-0">
        <div className="dados row g-3">
          <div className="col">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <p>Você deseja apagar o serviço <strong>{servico.titulo}</strong> do sistema?</p>

              <ul>
                <li>Título do serviço: <strong>{servico.titulo} {servico.titulo}</strong></li>
                <li>Preço: <strong>R$ {servico.preco}</strong></li>
                <li>Descrição: <strong>{servico.descricao}</strong></li>
              </ul>

              <p className="text-danger"><strong>ATENÇÃO: esta ação é irreversível.</strong> Recomenda-se fazer um backup antes de apagar quaisquer dados.</p>

              <ApagarServicoForm servico={servico} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}