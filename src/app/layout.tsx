import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import localFont from "next/font/local";
import "./globals.css";

const ubuntu = localFont({
  src: [
    {
      path: './public/fonts/Ubuntu-Light.ttf',
      weight: '300',
      style: 'normal',
      display: 'swap',
      preload: true
    },
    {
      path: './public/fonts/Ubuntu-LightItalic.ttf',
      weight: '300',
      style: 'italic',
      display: 'swap',
      preload: true
    },
    {
      path: './public/fonts/Ubuntu-Regular.ttf',
      weight: '400',
      style: 'normal',
      display: 'swap',
      preload: true
    },
    {
      path: './public/fonts/Ubuntu-Italic.ttf',
      weight: '400',
      style: 'italic',
      display: 'swap',
      preload: true
    },
    {
      path: './public/fonts/Ubuntu-Medium.ttf',
      weight: '500',
      style: 'normal',
      display: 'swap',
      preload: true
    },
    {
      path: './public/fonts/Ubuntu-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
      display: 'swap',
      preload: true
    },
    {
      path: './public/fonts/Ubuntu-Bold.ttf',
      weight: '700',
      style: 'normal',
      display: 'swap',
      preload: true
    },
    {
      path: './public/fonts/Ubuntu-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
      display: 'swap',
      preload: true
    },
  ]
})

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
    <html lang="pt-br" className={ubuntu.className}>
      <body>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          newestOnTop={false}
          pauseOnHover={true}
          transition={Bounce}
        />
      </body>
    </html>
  );
}
