import styles from "@/app/painel/painel.module.css"
import CriarClienteForm from "@/app/components/clientes/criarclienteform";

export default async function NovoCliente() {
  // // Listar serviços para compor o formulário de novo cliente
  // const servicos = await prisma.servico.findMany({
  //   select: { id: true, titulo: true, preco: true },
  //   orderBy: { titulo: "asc" },
  // });

  return(<>
      <div className={["secao-titulo m-2 p-2 mb-3 border rounded", styles.boxConteudo].join(" ")}>
        <h1>Cadastro de clientes</h1>
      </div>

      <CriarClienteForm />
    </>
  );
}