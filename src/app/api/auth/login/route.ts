import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, senha } = await request.json();

    // Verifica se os campos foram ou não preenchidos
    if(!email || !senha) {
      return NextResponse.json(
        { error: 'Endereço de e-mail e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    // Busca o usuário no banco de dados
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    console.log(usuario)

    if(!usuario) {
      return NextResponse.json(
        { error: 'Usuário(a) não encontrado(a).' },
        { status: 401 }
      );
    }

    // Verifica a senha digitada mo campo, comparando-a com a senha salva no banco
    const senhaEncriptada = await bcrypt.compare(senha, usuario.senha)

    if(!senhaEncriptada) {
      return NextResponse.json(
        { error: 'Senha inválida.' },
        { status: 401 }
      );
    }

    // Criar token JWT
    const token = await createToken({
      usuarioId: usuario.id,
      email: usuario.email,
      nome: usuario.nome
    });

    // configurar cookie e retornar resposta
    const response = NextResponse.json({
      message: 'Login realizado com sucesso.',
      user: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/painel'
    });

    return response;

  } catch(error) {
    // Define e emite mensagem de erro em caso de falha de login.
    return NextResponse.json(
      { error: 'Erro de servidor: falha de login.' },
      { status: 500 }
    )
  }
}