import styles from "@/app/painel/painel.module.css"

// type AlteracoesProps = {
//   id: String,
//   nome: String,
//   sobrenome: String,
//   setor: String,
//   cargo: String
// }

export default function RegistroAlteracoes() {
  return (
    <div className="col-3">
      <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
        <h2>Registro de Alterações</h2>
        <ul>
          <li>Mudança - Data</li>
          <li>Mudança - Data</li>
          <li>Mudança - Data</li>
          <li>Mudança - Data</li>
          <li>Mudança - Data</li>
        </ul>
      </div>
    </div>
  )
}