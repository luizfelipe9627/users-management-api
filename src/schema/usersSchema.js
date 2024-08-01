const { z } = require("zod"); // Importa a função z do zod, responsável por criar schemas de validação.

// Define um schema chamado userInfosSchema responsável por validar os campos name, email e password.
const userInfosSchema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório e não pode estar vazio."), // O campo name deve ser uma string e ter no mínimo 1 caractere.
  email: z.string().email("O endereço de e-mail fornecido é inválido."), // O campo email deve ser uma string e ter o formato de um e-mail válido.
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."), // O campo password deve ser uma string e ter no mínimo 6 caracteres.
});

// Define um schema chamado userCredentialSchema responsável por validar os campos email e password.
const userCredentialSchema = z.object({
  email: z.string().email("O endereço de e-mail fornecido é inválido."), // O campo email deve ser uma string e ter o formato de um e-mail válido.
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."), // O campo password deve ser uma string e ter no mínimo 6 caracteres.
});

// Define um schema chamado userPasswordSchema responsável por validar o campo password.
const userPasswordSchema = z.object({
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."), // O campo password deve ser uma string e ter no mínimo 6 caracteres.
});

// Exporta os schemas de validação userInfosSchema, userCredentialSchema e userPasswordSchema para serem utilizados em outros arquivos.
module.exports = {
  userInfosSchema,
  userCredentialSchema,
  userPasswordSchema,
};
