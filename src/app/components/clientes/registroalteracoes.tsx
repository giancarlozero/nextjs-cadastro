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
    <div className={["w-3/12 p-2 border rounded", styles.boxConteudo].join(" ")}>
      <h2>Registro de alterações</h2>
      <ul>
        <li>Mudança - Data</li>
        <li>Mudança - Data</li>
        <li>Mudança - Data</li>
        <li>Mudança - Data</li>
        <li>Mudança - Data</li>
      </ul>
    </div>
  )
}