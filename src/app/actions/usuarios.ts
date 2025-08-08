'use server'

import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";

// CRIAR usuário
// =============
export async function criarUsuario(formData: FormData) {
  try {
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

    // Registra o usuário que foi criado
    await prisma.usuarioLog.create({
      data: {
        acao: 'CRIADO',
        usuarioId: usuarioCriado.id,
        detalhes: JSON.stringify({nome, sobrenome, nivel_acesso, setor, cargo})
      }
    })

    return { success: true, message: 'Usuário(a) criado(a) com sucesso.' }
  } catch (error) {
    return { success: false, message: 'Erro ao criar usuário(a).' }
  }
}

// EDITAR usuário
// ==============
export async function editarUsuario(usuarioId: string, formData: FormData) {
  try {
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
    await prisma.usuario.update({
      where: { id: usuarioId },
      data: {
        nome,
        sobrenome,
        setor,
        cargo
      }
    })

    // Grava as opções antes e depois da edição para serem registradas
    const edicoesFeitas: Record<string, {antes:string; depois:string}> = {}

    if(usuarioAntes.nome !== nome) edicoesFeitas.nome = {antes: usuarioAntes.nome, depois: nome}
    if(usuarioAntes.sobrenome !== sobrenome) edicoesFeitas.sobrenome = {antes: usuarioAntes.sobrenome, depois: sobrenome}
    if(usuarioAntes.setor !== setor) edicoesFeitas.setor = {antes: usuarioAntes.setor, depois: nome}
    if(usuarioAntes.cargo !== cargo) edicoesFeitas.cargo = {antes: usuarioAntes.cargo, depois: nome}

    // Registra as edições feitas
    if(Object.keys(edicoesFeitas).length > 0) {
      await prisma.usuarioLog.create({
        data: {
          acao: 'EDITADO',
          usuarioId,
          detalhes: JSON.stringify(edicoesFeitas)
        }
      })
    }

    return { success: true, message: 'Usuário(a) editado(a) com sucesso.' }
  } catch (error) {
    return { success: false, message: 'Erro ao editar usuário(a).' }
  }
}

// APAGAR usuário
// ===============
export async function apagarUsuario(formData: FormData) {
  const usuarioId = formData.get('id') as string;

  try {
    const usuarioApagado = await prisma.usuario.findUnique({
      where: {
        id: usuarioId
      }
    })

    if(!usuarioApagado) {
      return {
        success: false,
        message: 'Usuário(a) não encontrado(a)',
      }
    }

    await prisma.usuarioLog.create({
      data: {
        acao: 'APAGADO',
        usuarioId,
        detalhes: JSON.stringify({
          nome: usuarioApagado.nome,
          sobrenome: usuarioApagado.sobrenome
        })
      }
    })

    await prisma.usuario.delete({
      where: {
        id: usuarioId
      }
    });

    // return redirect('/painel/usuarios?apagado=1');
    return { success: true, message: 'Usuário apagado com sucesso' }
  } catch(error) {
    console.error(error);
    return { success: false, message: 'Erro ao apagar usuário(a).' }
  }
}