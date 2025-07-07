'use server'

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// CRIAR usuário
// =============
export async function criarUsuario(formData: FormData) {

  const nome = formData.get('nome') as string;
  const setor = formData.get('setor') as string;
  const cargo = formData.get('cargo') as string;
  const usuario = formData.get('usuario') as string;
  const senha = formData.get('senha') as string;

  await prisma.usuario.create({
    data: {
      nome,
      setor,
      cargo,
      usuario,
      senha
    }
  })

  revalidatePath('/painel/usuarios')
  redirect('/painel/usuarios')
}

// EDITAR usuário
// ==============
// export async function editarUsuario(formData: FormData) {

//   const usuarioSelecionado = formData.get('id') as string;

//   await prisma.usuario.update({
//     where: { id },
//     data: {
//       nome,
//       setor,
//       cargo
//     }
//   })

//   revalidatePath('/painel/usuarios')
//   redirect('/painel/usuarios')
// }

// DELETAR usuário
// ===============