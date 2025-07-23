import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapJS from "@/app/components/bootstrapjs/BootstrapJS";
import "./globals.css";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export const metadata: Metadata = {
  title: "NextJS CRUD",
  description: "Exemplo de aplicação de cadastro de usuários, feito com o React e o NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        <BootstrapJS />
      </body>
    </html>
  );
}
