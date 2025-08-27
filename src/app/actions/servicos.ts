'use server'

import { prisma } from "../lib/prisma";

// CRIAR serviço
// =============
export async function criarServico(formData: FormData) {
  try {
    // Usa formData.get para pegar os valores de cada campo e atribuir à respectiva variável
    const titulo = formData.get('titulo-servico') as string;
    const descricao = formData.get('descricao-servico') as string;
    const preco = formData.get('preco-servico') as string;

    // Salva os dados do novo usuário no banco
    // const servicoCriado = await prisma.servico.create({
    await prisma.servico.create({
      data: {
        titulo,
        descricao,
        preco
      }
    })

    // Registra o usuário que foi criado
    // await prisma.servicoLog.create({
    //   data: {
    //     acao: 'CRIADO',
    //     servicoId: servicoCriado.id,
    //     detalhes: JSON.stringify({titulo, descricao, preco})
    //   }
    // })

    return { success: true, message: 'Serviço(a) criado(a) com sucesso.' }
  } catch (error) {
    return { success: false, message: 'Erro ao criar serviço(a).' }
  }
}

