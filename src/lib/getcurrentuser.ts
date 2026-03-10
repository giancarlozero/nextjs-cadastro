import { cookies } from "next/headers";
import { verifyToken } from "./auth";
import { prisma } from "@/app/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if(!token) return null;

  const payload = await verifyToken(token);

  if(!payload) return null;

  const usuario = await prisma.usuario.findUnique({
    where: { id: payload.usuarioId }
  });

  return usuario;
}