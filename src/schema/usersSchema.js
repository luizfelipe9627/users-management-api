const { z } = require('zod');

const userInfosSchema = z.object({
    name: z.string().min(1, 'O campo nome é obrigatório e não pode estar vazio.'),
    email: z.string().email('O endereço de e-mail fornecido é inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.')
});

const userCredentialSchema = z.object({
    email: z.string().email('O endereço de e-mail fornecido é inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

const userPasswordSchema = z.object({
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

module.exports = {
    userInfosSchema,
    userCredentialSchema,
    userPasswordSchema
};
