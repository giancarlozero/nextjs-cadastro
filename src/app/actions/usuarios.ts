'use server'

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// CRIAR usuário
// =============
export async function criarUsuario(formData: FormData) {

  // Usa formData.get para pegar os valores de cada campo e atribuir à respectiva variável
  const nome = formData.get('nome') as string;
  const setor = formData.get('setor') as string;
  const cargo = formData.get('cargo') as string;
  const usuario = formData.get('usuario') as string;
  const senha = formData.get('senha') as string;

  // Salva os dados do novo usuário no banco
  await prisma.usuario.create({
    data: {
      nome,
      setor,
      cargo,
      usuario,
      senha
    }
  })

  // Atualiza o cache da página '/usuarios'
  revalidatePath('/painel/usuarios')
  // Redireciona para a página '/usuarios'
  redirect('/painel/usuarios')
}

// EDITAR usuário
// ==============
export async function editarUsuario(usuarioId: string, formData: FormData) {

  // Verifica se o ID do usuário foi coletado corretamente
  if (!usuarioId || usuarioId.trim() === '') {
    throw new Error('ID de usuário inválido.');
  }

  // Define os dados a serem editados e coleta os novos dados digitados nos campos
  const nome = formData.get('nome') as string;
  const setor = formData.get('setor') as string;
  const cargo = formData.get('cargo') as string;

  // Atualiza os dados do usuário selecionado no banco
  await prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      nome,
      setor,
      cargo
    }
  })

  revalidatePath('/painel/usuarios')
  redirect('/painel/usuarios?sucesso=1')
}

// DELETAR usuário
// ===============
export async function apagarUsuario(formData: FormData) {
  try {
    const id = formData.get('id') as string;

    await prisma.usuario.delete({
      where: { id }
    })

    revalidatePath('/painel/usuarios')
    redirect('/painel/usuarios')
  } catch(error) {
    return { error: 'Falha ao apagar usuário.'}
  }
}