import styles from "@/app/painel/painel.module.css"
import CriarServicoForm from "@/app/components/servicos/criarservicoform"

export default function NovoServico() {
  return(<>
      <div className={["secao-titulo m-2 p-2 border rounded", styles.boxConteudo].join(" ")}>
        <h1>Cadastro de serviços</h1>
      </div>

      <CriarServicoForm />
    </>
  );
}