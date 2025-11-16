import Link from "next/link"

export default function CriarClientesDescricao() {
  return (
    <>
      <p>Preencha o formulário e crie um novo cliente neste sistema com os dados desejados. Defina aqui o nome completo ou razão social do cliente, o documento (CPF ou CNPJ) e descreva-o para facilitar a identificação.</p>

      <p>Selecione também os serviços oferecidos pela sua empresa que este cliente deseja contratar, bem como a quantidade de cada serviço a ser contratado (um cliente pode querer contratar a criação de 5 Landing Pages para uma ação publicitária, por exemplo). O total será exibido abaixo da lista de seleção, registrado juntamente com os demais dados deste cliente <Link className="linksimples" href="/painel/clientes">e exibido na listagem de clientes</Link>.</p>

      <p>Caso não haja nenhum serviço cadastrado, <Link className="linksimples" href="/painel/servicos/criar">clique aqui e cadastre alguns</Link>.</p>
    </>
  )
}