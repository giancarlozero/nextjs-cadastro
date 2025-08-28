import styles from "@/app/painel/painel.module.css"
import CriarServicoForm from "@/app/components/servicos/criarservicoform"

export default function NovoServico() {
  return(<>
      <div className="secao-titulo container-fluid p-0">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h1>Cadastro de serviços</h1>
            </div>
          </div>
        </div>
      </div>

      <CriarServicoForm />
    </>
  );
}