'use server'

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// CRIAR usuário
// =============
export async function criarUsuario(formData: FormData) {

  // Usa formData.get para pegar os valores de cada campo e atribuir à respectiva variável
  const nome = formData.get('nome') as string;
  const sobrenome = formData.get('sobrenome') as string;
  const nivel_acesso = formData.get('nivel_acesso') as string;
  const setor = formData.get('setor') as string;
  const cargo = formData.get('cargo') as string;
  const email = formData.get('email') as string;
  const senha = formData.get('senha') as string;

  // Salva os dados do novo usuário no banco
  const usuarioCriado = await prisma.usuario.create({
    data: {
      nome,
      sobrenome,
      nivel_acesso,
      setor,
      cargo,
      email,
      senha
    }
  })

  await prisma.usuarioLog.create({
    data: {
      acao: 'CRIADO',
      usuarioId: usuarioCriado.id,
      detalhes: JSON.stringify({nome, sobrenome, nivel_acesso, setor, cargo})
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
  const sobrenome = formData.get('sobrenome') as string;
  const setor = formData.get('setor') as string;
  const cargo = formData.get('cargo') as string;

  const usuarioAntes = await prisma.usuario.findUnique({ where: { id: usuarioId } })

  if(!usuarioAntes) throw new Error('Usuário não encontrado')

  // Atualiza os dados do usuário selecionado no banco
  const usuarioAtualizado = await prisma.usuario.update({
    where: { id: usuarioId },
    data: {
      nome,
      sobrenome,
      setor,
      cargo
    }
  })

  const alteracoesFeitas: Record<string, {antes:string; depois:string}> = {}

  if(usuarioAntes.nome !== nome) alteracoesFeitas.nome = {antes: usuarioAntes.nome, depois: nome}
  if(usuarioAntes.sobrenome !== sobrenome) alteracoesFeitas.sobrenome = {antes: usuarioAntes.sobrenome, depois: sobrenome}
  if(usuarioAntes.setor !== setor) alteracoesFeitas.setor = {antes: usuarioAntes.setor, depois: nome}
  if(usuarioAntes.cargo !== cargo) alteracoesFeitas.cargo = {antes: usuarioAntes.cargo, depois: nome}

  if(Object.keys(alteracoesFeitas).length > 0) {
    await prisma.usuarioLog.create({
      data: {
        acao: 'EDITADO',
        usuarioId,
        detalhes: JSON.stringify(alteracoesFeitas)
      }
    })
  }

  revalidatePath('/painel/usuarios')
  if(usuarioAtualizado.nivel_acesso === 'Administrador') {
    redirect('/painel/usuarios?admin=1')
  }
  redirect('/painel/usuarios?admin=0')
}

// DELETAR usuário
// ===============
export async function apagarUsuario(formData: FormData) {
  try {
    const id = formData.get('id') as string;
    const usuario = await prisma.usuario.findUnique({ where: { id } })

    if(!usuario) throw new Error('Usuário não encontrado')

    await prisma.usuario.delete({ where: { id } })

    await prisma.usuarioLog.create ({
      data: {
        acao: 'APAGADO',
        usuarioId: id,
        detalhes: JSON.stringify({
          nome: usuario.nome,
          sobrenome: usuario.sobrenome
        })
      }
    })

    revalidatePath('/painel/usuarios')
    redirect('/painel/usuarios')
  } catch(error) {
    return { error: 'Falha ao apagar usuário.'}
  }
}