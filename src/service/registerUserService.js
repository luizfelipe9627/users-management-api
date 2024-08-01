const {encryptPassword} = require("../auth/passwordAuth"); // A constante encryptPassword armazena a função encryptPassword que criptografa a senha do usuário.
const connection = require("../database/connection"); // A constante connection armazena a conexão com o banco de dados.
const {createJWT} = require("../auth/tokenAuth"); // A constante createJWT armazena a função createJWT que cria um token JWT para o usuário.

// A função registerUser é responsável por cadastrar um novo usuário no banco de dados recebe dois parâmetros, a requisição e a resposta. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const registerUser = async (req, res) => {
    // O try é um bloco de código que pode gerar uma exceção. O código dentro do bloco try é executado e se ocorrer um erro, o bloco catch é executado.
    try {
        const { name, email, password } = req.body; // A constante name, email e password armazenam o nome, email e a senha do usuário que foram enviados na requisição.

        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
        const hashPassword = await encryptPassword(password); // A constante hashPassword armazena a senha criptografada.

        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
        const token = await createJWT(email); // A constante token armazena o token JWT gerado pela função createJWT.

        const query = 'INSERT INTO users (name, email, password, token) VALUES (?,?,?,?);'; // A constante query armazena a consulta SQL que será feita no banco de dados para inserir um novo usuário.
        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
        const [result] = await connection.execute(query, [name, email, hashPassword, token]); // A constante result armazena o resultado da consulta ao banco de dados,

        const userId = result.insertId; // A constante userId armazena o id do usuário inserido no banco de dados.

        const updatedUserQuery = 'SELECT * FROM users WHERE id = ?'; // A constante updatedUserQuery armazena a consulta SQL que será feita no banco de dados para selecionar o usuário atualizado.
        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
        const [updatedUsers] = await connection.execute(updatedUserQuery, [userId]); // A constante updatedUsers armazena o resultado da consulta ao banco de dados.

        const updatedUser = updatedUsers[0]; // A constante updatedUser armazena o primeiro usuário retornado pela consulta.

        res.setHeader('authorization', `Bearer ${updatedUser.token}`); // Define o cabeçalho de autorização da resposta com o token do usuário.

        return res.status(201).json({ token: updatedUser.token }); // Retorna uma resposta com status 201 e um objeto JSON com a propriedade token e o token do usuário.
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.' }); // Retorna uma resposta com status 500 e um objeto JSON com a propriedade error e a mensagem de erro.
    }
}

module.exports = registerUser; // Exporta a função registerUser para ser utilizada em outros arquivos.