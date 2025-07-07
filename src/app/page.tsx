import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Olá mundo!</h1>

      <Link href="/painel">Login</Link>
    </>
  );
}
