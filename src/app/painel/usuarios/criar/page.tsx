import styles from "@/app/painel/painel.module.css"
import CriarUsuarioForm from "@/app/components/usuarios/criarusuarioform";

export default function NovoUsuario() {
  return(<>
      <div className={["secao-titulo m-2 p-2 mb-3 border rounded", styles.boxConteudo].join(" ")}>
        <h1>Cadastro de usuários</h1>
      </div>

      <CriarUsuarioForm />
    </>
  );
}