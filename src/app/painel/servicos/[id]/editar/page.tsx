import styles from "@/app/painel/painel.module.css"
import EditarServicoForm from "@/app/components/servicos/editarservicoform";
import { prisma } from "@/app/lib/prisma";

export default async function EditarServico(props: {params: Promise<{id: string}>}) {
  const params = await props.params;
  const servico = await prisma.servico.findUnique({
    where: { id: params.id },
  });

  if(!servico) {
    return <p>Serviço não encontrado.</p>
  }

  return(
    <>
      <div className="secao-titulo container-fluid p-0">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h1>Edição de serviços</h1>
            </div>
          </div>
        </div>
      </div>

      <EditarServicoForm servico={servico} />
    </>
  );
}