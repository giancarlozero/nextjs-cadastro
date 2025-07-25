import Link from "next/link";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="cta col-12 col-md-7 d-flex flex-row align-items-center justify-content-center p-5">
          <div className="cta-texto">
            <h1>Lorem Ipsum</h1>
            <p>Dolor Sit Amet Dolor Sit Amet Dolor Sit Amet Dolor Sit Amet </p>
          </div>
        </div>

        <div className="login col-12 col-md-5 d-flex flex-row align-items-center justify-content-center p-5">
          <form>
            <label htmlFor="email">Endereço de email</label>
            <input className="form-control" type="email" name="email" id="email" />

            <label htmlFor="senha">Senha</label>
            <input className="form-control" type="password" name="senha" id="senha" />

            <br />

            <div className="d-grid mx-auto">
              <input className="btn btn-dark" type="submit" value="Entrar" />
            </div>

            <br />

            <Link href="#">Esqueci minha senha</Link>

            <br />

            <Link href="/painel">Painel (link temporário dev)</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
