const { z } = require('zod');

const userRegisterSchema = z.object({
    name: z.string().min(1, 'O campo nome é obrigatório e não pode estar vazio.'),
    email: z.string().email('O endereço de e-mail fornecido é inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.')
});

const userLoginSchema = z.object({
    email: z.string().email('O endereço de e-mail fornecido é inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

const userTokenSchema = z.object({
    email: z.string().email('O endereço de e-mail fornecido é inválido.').optional(),
    token: z.string().min(1, 'O token é obrigatório e não pode estar vazio.'),
})

const userDeleteSchema = z.object({
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    token: z.string().min(1, 'O token é obrigatório e não pode estar vazio.'),
})

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userTokenSchema,
    userDeleteSchema
};
