import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

// CRIAR cliente - Endpoint auxiliar para listar serviços
export async function GET() {
  const servicos = await prisma.servico.findMany({
    select: {
      id: true,
      titulo: true,
      preco: true
    },
    orderBy: {
      titulo: "asc",
    }
  });

  return NextResponse.json(servicos);
}