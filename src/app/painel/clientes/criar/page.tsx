import styles from "@/app/painel/painel.module.css"
import CriarClienteForm from "@/app/components/clientes/criarclienteform";

export default async function NovoCliente() {
  return(<>
      <div className={["secao-titulo m-2 p-2 mb-3 border rounded", styles.boxConteudo].join(" ")}>
        <h1>Cadastro de clientes</h1>
      </div>

      <CriarClienteForm />
    </>
  );
}