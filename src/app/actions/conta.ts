'use server'

import { prisma } from "../lib/prisma";
import { primeiroAcessoSchema } from "../lib/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export async function criarPrimeiroAdmin(formData: FormData) {
  try {
    // Verifica se já existe algum usuário salvo no banco
    const existeUsuario = await prisma.usuario.count();
    if (existeUsuario > 0) {
      return { errors: { global: ["O primeiro usuário já foi criado."] } }
    }

    // Recebe os dados do formulário
    const dadosDoForm = {
      nivel_acesso: formData.get("nivel_acesso"),
      nome: formData.get("nome"),
      sobrenome: formData.get("sobrenome"),
      setor: formData.get("setor"),
      cargo: formData.get("cargo"),
      email: formData.get("email"),
      senha: formData.get("senha"),
    };

    // Valida os dados do formulário com o Zod
    const dadosValidados = primeiroAcessoSchema.safeParse(dadosDoForm);

    // Prepara as mensagens de erro para serem exibidas pelo Toastify
    if (!dadosValidados.success) {
      const listaErros = z.treeifyError(dadosValidados.error);

      const errosFormatados: Record<string, string[]> = {};

      const obterMensagens = (obj: any, prefix = "") => {
        for (const chave in obj) {
          const valor = obj[chave];

          if(Array.isArray(valor)) {
            errosFormatados[prefix + chave] = valor;
          } else if(typeof valor === "object") {
            obterMensagens(valor, prefix + chave + ".")
          }
        }
      };

      obterMensagens(listaErros)

      return {
        success: false,
        errors: errosFormatados,
      }
    }

    // Criptografa a senha com BCrypt
    const senhaHash = await bcrypt.hash(dadosValidados.data.senha, 10);

    // Salva o usuário no banco
    await prisma.usuario.create({
      data: {
        ...dadosValidados.data,
        senha: senhaHash,
      }
    })

    return { success: true };
  } catch(error) {
    return {
      success: false,
      errors: {
        global: ["Erro ao criar administrador(a)."]
      }
    };
  }
}