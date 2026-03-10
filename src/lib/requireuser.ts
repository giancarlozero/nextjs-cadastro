import { redirect } from "next/navigation";
import { getCurrentUser } from "./getcurrentuser";

export async function requireUser() {
  const usuario = await getCurrentUser();

  if(!usuario) {
    redirect("/")
  }

  return usuario;
}