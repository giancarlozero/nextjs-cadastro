import Link from "next/link";
import { Email, Google, Facebook, Apple } from "@deemlol/next-icons";

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
          <div>
            <div className="btn-group-vertical btn-group-lg">
              <Link className="btn btn-outline-dark" href="/painel">
                <Email size={24} color="#000000" /> Login com usuário e senha
              </Link>
              <a className="btn btn-outline-dark" href="#">
                <Google size={24} color="#000000" /> Login com Google
              </a>
              <a className="btn btn-outline-dark" href="#">
                <Facebook size={24} color="#000000" /> Login com Facebook
              </a>
              <a className="btn btn-outline-dark" href="#">
                <Apple size={24} color="#000000" /> Login com Apple
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
