import type { Metadata } from "next";
// import "./globals.css";

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
      </body>
    </html>
  );
}
