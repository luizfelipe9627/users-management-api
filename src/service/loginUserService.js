const {validatePassword} = require("../auth/passwordAuth"); // Importa a função validatePassword do arquivo passwordAuth.js.
const {updateJWT} = require("../auth/tokenAuth"); // Importa a função updateJWT do arquivo tokenAuth.js.
const connection = require("../database/connection"); // Importa a conexão com o banco de dados.

// A função loginUser é responsável por autenticar um usuário no sistema, recebe dois parâmetros a requisição e a resposta. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const loginUser = async (req, res) => {
    // O try é um bloco de código que pode gerar uma exceção. O código dentro do bloco try é executado e se ocorrer um erro, o bloco catch é executado.
    try {
        const { email, password } = req.body; // A constante email e password armazenam o email e a senha do usuário que foram enviados na requisição.

        const query = 'SELECT * FROM users WHERE email = ?'; // A constante query armazena a consulta SQL que será feita no banco de dados para selecionar o usuário com o email informado.
        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
        const [users] = await connection.execute(query, [email]); // A constante users armazena o resultado da consulta ao banco de dados.

        // Se não existir nenhum usuário com o email informado executa o if.
        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' }); // Retorna uma resposta com status 404 e um objeto JSON com a propriedade error e a mensagem de erro.
        }

        const user = users[0]; // A constante user armazena o primeiro usuário retornado pela consulta.

        const comparePassword = await validatePassword(password, user.password); // A constante comparePassword armazena o resultado da função validatePassword que compara a senha informada com a senha armazenada no banco de dados.

        // Se a senha informada for diferente da senha armazenada no banco de dados executa o if.
        if (!comparePassword) {
            return res.status(401).json({ error: 'Senha inválida.' }); // Retorna uma resposta com status 401 e um objeto JSON com a propriedade error e a mensagem de erro.
        }

        const newToken = await updateJWT(user.id, user.token); // A constante newToken armazena o resultado da função updateJWT que atualiza o token de autenticação do usuário.

        res.setHeader('Authorization', `Bearer ${newToken}`); // Define o cabeçalho de autorização da resposta com o novo token.

        return res.status(200).json({ token: newToken}); // Retorna uma resposta com status 200 e um objeto JSON com a propriedade token e o novo token de autenticação.
    } catch (err) {
        return res.status(500).json({ error: err.message }); // Retorna uma resposta com status 500 e um objeto JSON com a propriedade error e a mensagem de erro.
    }
}

module.exports = loginUser; // Exporta a função loginUser para ser utilizada em outros arquivos.