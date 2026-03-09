import type { Metadata } from "next";
import styles from '@/app/painel/painel.module.css'
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Painel de Controle | NextJS CRUD"
};

export default async function Inicio() {
  const sessaoAtiva = await getSession();

  if(!sessaoAtiva) {
    redirect('/');
  }

  return(
    <>
      <div className={["secao-titulo m-2 p-2 mb-3 border rounded", styles.boxConteudo].join(" ")}>
        <h1>Boas vindas, usuário(a)!</h1>
      </div>

      <div className="secao-dados m-2 grid grid-cols-4 gap-2.5">
        <div className={["card-dados p-2 border rounded", styles.boxConteudo].join(" ")}>
          <h2>Dados</h2>
          <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
        </div>

        <div className={["card-dados p-2 border rounded", styles.boxConteudo].join(" ")}>
          <h2>Dados</h2>
          <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
        </div>

        <div className={["card-dados p-2 border rounded", styles.boxConteudo].join(" ")}>
          <h2>Dados</h2>
          <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
        </div>

        <div className={["card-dados p-2 border rounded", styles.boxConteudo].join(" ")}>
          <h2>Dados</h2>
          <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
        </div>
      </div>

      <div className="secao-texto m-2 grid grid-cols-2 gap-2.5">
        <div className="resumo">
          <h2>Resumo das suas atividades!</h2>
          <p>Sua pauta tem XX tarefas.</p>
          <p>Lista de tarefas recentes em breve</p>
          <p>Tarefa</p>
          <p>Tarefa</p>
          <p>Tarefa</p>
          <p>Tarefa</p>
          <p>Tarefa</p>
        </div>
        <div className="boasvindas">
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>Pariatur labore consequat proident ad labore id amet pariatur nisi reprehenderit eu irure. Consequat sit laborum cupidatat Lorem exercitation velit qui reprehenderit culpa occaecat pariatur. Aliquip in qui tempor consectetur tempor ex nulla non mollit excepteur qui enim do adipisicing. Aute aute nulla deserunt Lorem sunt cupidatat exercitation pariatur. In commodo sint do mollit eu deserunt exercitation tempor. Aliquip minim cupidatat exercitation occaecat dolore aliquip non dolore amet. In occaecat sunt proident velit nostrud est laboris dolor ut et consectetur aliqua.</p>

          <p>Reprehenderit irure ad esse id aute ex. Pariatur ad nulla minim magna. Ut eiusmod velit adipisicing reprehenderit. Reprehenderit aliquip tempor est ullamco sit incididunt duis magna in deserunt nulla aliquip.</p>
        </div>
      </div>
    </>
  );
}