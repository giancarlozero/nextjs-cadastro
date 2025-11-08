'use server'

import { prisma } from "../lib/prisma";

// CRIAR cliente
// =============
export async function criarCliente(formData: FormData) {
  try {
    // Usa formData.get para pegar os valores de cada campo e atribuir à respectiva variável
    const nome = formData.get('nome') as string;
    const documento = formData.get('documento') as string;

    // Recebe os dados dos serviços selecionados e respectivas quantidades
    const servicosSelecionados = JSON.parse(formData.get("servicosSelectionados")?.toString() || "[]");

    // const valor = formData.get('valor') as string
    const descricao = formData.get('descricao') as string;

    // Calcula no backend o valor total dos serviços selecionados
    const valorTotal = servicosSelecionados.reduce((acc: number, s: any) => acc + s.preco * s.quantidade, 0);

    // Salva os dados do novo usuário no banco
    await prisma.cliente.create({
      data: {
        nome,
        documento,
        servicos: servicosSelecionados.length > 0 ? {
          connect: servicosSelecionados.map((s: any) => ({id: s.id})),
        } : undefined,
        valor: valorTotal,
        descricao,
      }
    })

    // Registra o cliente que foi criado
    // await prisma.clienteLog.create({
    //   data: {
    //     acao: 'CRIADO',
    //     clienteId: servicoCriado.id,
    //     detalhes: JSON.stringify({titulo, descricao, preco})
    //   }
    // })

    return { success: true, message: 'Cliente criado com sucesso.' }
  } catch (error) {
    return { success: false, message: 'Erro ao criar cliente.' }
  }
}

// EDITAR cliente
// ==============
export async function editarCliente(clienteId: string, formData: FormData) {
  try {
    // Verifica se o ID do cliente foi coletado corretamente
    if (!clienteId || clienteId.trim() === '') {
      throw new Error('ID de cliente inválido.');
    }

    const nome = formData.get('nome') as string;
    const documento = formData.get('documento') as string;
    const valor = formData.get('valor') as string
    const descricao = formData.get('descricao') as string;

    // O valor numérico obtido do formulário sempre vem como string. Convertê-lo para float
    const valorFloat = parseFloat(valor)

    await prisma.cliente.update({
      where: { id: clienteId },
      data: {
        nome,
        documento,
        valor: valorFloat,
        descricao
      }
    })

    return { success: true, message: 'Cliente editado com sucesso.' }
  } catch {
    return { success: false, message: 'Erro ao editar cliente.' }
  }
}

// APAGAR cliente
// ==============
export async function apagarCliente(formData: FormData) {
  const clienteId = formData.get('id') as string;

  try {
    const clienteApagado = await prisma.cliente.findUnique({
      where: {
        id: clienteId
      }
    })

    if(!clienteApagado) {
      return {
        success: false,
        message: 'Cliente não encontrado(a)',
      }
    }

    await prisma.cliente.delete({
      where: {
        id: clienteId
      }
    })

    return { success: true, message: 'Cliente apagado com sucesso' }
  } catch(error) {
    return { success: false, message: 'Erro ao apagar cliente.' }
  }
}