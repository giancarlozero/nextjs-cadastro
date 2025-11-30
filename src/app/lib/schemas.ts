import { z } from 'zod';

// Validação do formulário de primeiro acesso
// ==========================================
export const primeiroAcessoSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  sobrenome: z.string().min(2, "Sobrenome é obrigatório"),
  nivel_acesso: z.string().min(2, "Nível de acesso é obrigatório"),
  setor: z.string().min(2, "Setor é obrigatório"),
  cargo: z.string().min(2, "Cargo é obrigatório"),
  email: z.email("Endereço de e-mail inválido"),
  senha: z.string().min(10,"Senha é obrigatória. Mínimo de 10 caracteres."),
});