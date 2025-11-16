import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apagar Cliente | NextJS CRUD",
};

export default function ClienteDadosLayout({ children }: {children: React.ReactNode}) {
  return(
    <div className="apagar-cliente">
      {children}
    </div>
  );
}