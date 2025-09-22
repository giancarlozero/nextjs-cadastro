'use server'

import { prisma } from "../lib/prisma";

// CRIAR serviço
// =============
export async function criarServico(formData: FormData) {
  try {
    // Usa formData.get para pegar os valores de cada campo e atribuir à respectiva variável
    const titulo = formData.get('titulo') as string;
    const descricao = formData.get('descricao') as string;
    const preco = formData.get('preco')

    // O valor numérico obtido do formulário sempre vem como string. Convertê-lo para float
    const precoFloat = parseFloat(preco)

    // Salva os dados do novo usuário no banco
    await prisma.servico.create({
      data: {
        titulo,
        descricao,
        preco: precoFloat,
      }
    })

    // Registra o serviço que foi criado
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

// APAGAR serviço
// ==============
export async function apagarServico(formData: FormData) {
  const servicoId = formData.get('id') as string;

  try {
    const servicoApagado = await prisma.servico.findUnique({
      where: {
        id: servicoId
      }
    })

    if(!servicoApagado) {
      return {
        success: false,
        message: 'Serviço não encontrado(a)',
      }
    }

    await prisma.servico.delete({
      where: {
        id: servicoId
      }
    })

    return { success: true, message: 'Serviço apagado com sucesso' }
  } catch(error) {
    return { success: false, message: 'Erro ao apagar serviço.' }
  }
}