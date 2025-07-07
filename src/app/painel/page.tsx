import PainelLayout from "./layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel de Controle | NextJS CRUD"
};

export default function Inicio() {
  return(
    <>
      <h2>Dados do painel de controle</h2>
    </>
  );
}