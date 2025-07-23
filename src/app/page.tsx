import Link from "next/link";
import { LogIn } from "@deemlol/next-icons";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="crud-intro row m-10 p-20">
        <div className="min-vh-100 col d-flex flex-row align-items-center justify-content-center">
          <div>
            <h1>Boas vindas!</h1>
            <p>Gerencie sua equipe, tarefas e clientes</p>
          </div>
        </div>
        <div className="min-vh-100 col d-flex flex-row align-items-center justify-content-center">
          <Link className="btn btn-primary" href="/painel"><LogIn size={24} color="#FFFFFF" /> Iniciar Sessão</Link>
        </div>
      </div>
    </div>
  );
}
