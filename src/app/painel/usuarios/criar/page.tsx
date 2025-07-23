import styles from "@/app/painel/painel.module.css"
import CriarUsuarioForm from "@/app/components/usuarios/criarusuarioform";
import Link from "next/link";

export default function NovoUsuario() {
  return(<>
      <div className="secao-titulo container-fluid">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h1>Cadastro de usuários</h1>
            </div>
          </div>
        </div>
      </div>

      <CriarUsuarioForm />
    </>
  );
}