'use server'

import { prisma } from "../lib/prisma";

// CRIAR cliente
// =============
export async function criarCliente(formData: FormData) {
  try {
    // Usa formData.get para pegar os valores de cada campo e atribuir à respectiva variável
    const nome = formData.get('nome') as string;
    const documento = formData.get('documento') as string;

    // Recebe os dados dos serviços selecionados e respectivas quantidades vindos do formulário
    const servSelecionados = JSON.parse(
      formData.get("servicosSelecionados")?.toString() || "[]"
    );

    // Calcula no backend o valor total dos serviços selecionados,
    // considerando a quantidade desejada de cada serviço
    const valorTotal = servSelecionados.reduce(
      (acc: number, serv: any) => acc + Number(serv.preco) * serv.quantidade, 0
    );

    const descricao = formData.get('descricao') as string;


    // Salva os dados do novo cliente no banco
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        documento,
        valor: valorTotal,
        descricao: descricao ?? undefined,
      }
    });

    // Salva as relações entre cliente e serviço na tabela pivot "ClienteServico"
    if(servSelecionados.length > 0) {
      await prisma.clienteServico.createMany({
        data: servSelecionados.map((serv: any) => ({
          clienteId: cliente.id,
          servicoId: serv.id,
          quantidade: Number(serv.quantidade) || 1,
          preco: Number(serv.preco) || 0
        }))
      });
    }

    return { success: true, message: 'Cliente criado com sucesso.' }
  } catch (error) {
    return { success: false, message: 'Erro ao criar cliente.' }
  }
}

// EDITAR cliente
// ==============
export async function editarCliente(clienteId: string, formData: FormData) {
  try {
    // Obtém os valores dos demais campos a partir do formulário
    const nome = formData.get('nome') as string;
    const documento = formData.get('documento') as string;
    const descricao = formData.get('descricao') as string | null;

    // Obtém os serviços selecionados a partir do formulário
    const servSelecionados = JSON.parse(
      formData.get('servicosSelecionados')?.toString() || "[]"
    );

    // Faz o cálculo do valor total dos serviços selecionados
    const valorTotal = servSelecionados.reduce(
      (acc: number, serv: any) => acc + Number(serv.preco) * Number(serv.quantidade), 0
    );

    // Salva os novos dados do cliente no banco
    await prisma.cliente.update({
      where: {
        id: clienteId
      },
      data: {
        nome,
        documento,
        descricao: descricao ?? undefined,
        valor: valorTotal
      }
    });

    // Atualiza na tabela pivot as relações cliente x serviço:
    // Primeiro, apaga os dados antigos...
    await prisma.clienteServico.deleteMany({
      where: { clienteId }
    });

    // ...e depois, salva os dados novos.
    if(servSelecionados.length > 0) {
      await prisma.clienteServico.createMany({
        data: servSelecionados.map((serv: any) => ({
          clienteId,
          servicoId: serv.id,
          quantidade: Number(serv.quantidade) || 1,
          preco: Number(serv.preco) || 0
        }))
      })
    }

    return { success: true, message: 'Cliente editado com sucesso.' }
  } catch {
    return { success: false, message: 'Erro ao editar cliente.' }
  }
}

// APAGAR cliente
// ==============
export async function apagarCliente(formData: FormData) {
  const clienteApagarId = formData.get('id')

  // Se não houver cliente com esse ID, alerte com uma mensagem de erro.
  if(!clienteApagarId) {
      return {
        success: false,
        message: 'Cliente não encontrado(a)',
      }
    }

  try {
    // Apaga os serviços selecionados pelo cliente...
    await prisma.clienteServico.deleteMany({
      where: {
        clienteId: clienteApagarId
      }
    })

    // ... e depois apaga o cliente.
    await prisma.cliente.delete({
      where: {
        id: clienteApagarId
      }
    })

    return { success: true, message: 'Cliente apagado com sucesso' }
  } catch(error) {
    return { success: false, message: 'Erro ao apagar cliente.' }
  }
}