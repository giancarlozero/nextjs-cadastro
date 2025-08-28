import type { Metadata } from "next";
import styles from '@/app/painel/painel.module.css'

export const metadata: Metadata = {
  title: "Painel de Controle | NextJS CRUD"
};

export default function Inicio() {
  return(
    <>
      <div className="secao-titulo container-fluid p-0">
        <div className="titulo row">
          <div className="col-12">
            <div className={["p-2 border rounded", styles.boxConteudo].join(" ")}>
              <h1>Painel de controle</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="secao-dados container-fluid my-3 p-0">
        <div className="dados row g-3">
          <div className="col-3">
            <div className={["p-2 border rounded", styles.boxConteudo, styles.altura25].join(" ")}>
              <h2>Dados</h2>
              <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
            </div>
          </div>
          <div className="col-3">
            <div className={["p-2 border rounded", styles.boxConteudo, styles.altura25].join(" ")}>
              <h2>Dados</h2>
              <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
            </div>
          </div>
          <div className="col-3">
            <div className={["p-2 border rounded", styles.boxConteudo, styles.altura25].join(" ")}>
              <h2>Dados</h2>
              <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
            </div>
          </div>
          <div className="col-3">
            <div className={["p-2 border rounded", styles.boxConteudo, styles.altura25].join(" ")}>
              <h2>Dados</h2>
              <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="secao-dados container-fluid my-3 p-0">
        <div className="dados row g-3">
          <div className="col-4">
            <div className={["p-2 border rounded", styles.boxConteudo, styles.altura50].join(" ")}>
              <h2>Dados</h2>
              <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
            </div>
          </div>
          <div className="col-4">
            <div className={["p-2 border rounded", styles.boxConteudo, styles.altura50].join(" ")}>
              <h2>Dados</h2>
              <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
            </div>
          </div>
          <div className="col-4">
            <div className={["p-2 border rounded", styles.boxConteudo, styles.altura50].join(" ")}>
              <h2>Dados</h2>
              <p>Lorem aliqua dolore ut ut. Et et irure officia officia dolor. Eu mollit veniam non incididunt in reprehenderit deserunt nulla adipisicing.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}