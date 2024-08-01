const connection = require("../database/connection"); // A constante connection armazena a conexão com o banco de dados.
const {encryptPassword} = require("../auth/passwordAuth"); // A constante encryptPassword armazena a função encryptPassword que criptografa a senha do usuário.

// A função updateUser é responsável por atualizar um usuário no banco de dados, recebe dois parâmetros a requisição e a resposta. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const updateUser = async (req, res) => {
    // O try é um bloco de código que pode gerar uma exceção. O código dentro do bloco try é executado e se ocorrer um erro, o bloco catch é executado.
    try {
        const { name, email, password } = req.body; // A constante name, email e password armazenam o nome, email e a senha do usuário que foram enviados na requisição.

        const authHeader = req.headers.authorization; // A constante authHeader armazena o cabeçalho de autorização da requisição.
        const token = authHeader.split(' ')[1]; // A constante token armazena o token de autenticação, que é obtido através da função split que divide a string em um array de substrings, utilizando o espaço como separador.
 
        const query = 'SELECT * FROM users WHERE token = ?'; // A constante query armazena a consulta SQL que será feita no banco de dados para selecionar o usuário com o token informado.
        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
        const [users] = await connection.execute(query, [token]); // A constante users armazena o resultado da consulta ao banco de dados.

        // Se não existir nenhum usuário com o token informado executa o if.
        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' }); // Retorna uma resposta com status 404 e um objeto JSON com a propriedade error e a mensagem de erro.
        }

        const user = users[0]; // A constante user armazena o primeiro usuário retornado pela consulta.

        const fieldsToUpdate = []; // A constante fieldsToUpdate é um array que armazena os campos que serão atualizados.
        const values = []; // A constante values é um array que armazena os valores que serão atualizados.

        // Se o nome for diferente de nulo executa o if.
        if (name) {
            fieldsToUpdate.push('name = ?'); // Adiciona o campo name ao array fieldsToUpdate.
            values.push(name); // Adiciona o valor do nome ao array values.
        }

        // Se o email for diferente de nulo executa o if.
        if (email) {
            fieldsToUpdate.push('email = ?'); // Adiciona o campo email ao array fieldsToUpdate.
            values.push(email); // Adiciona o campo email ao array fieldsToUpdate.
        }

        // Se a senha for diferente de nulo executa o if.
        if (password) {
            // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
            const passwordCrypt = await encryptPassword(password) // A constante passwordCrypt armazena o resultado da função encryptPassword que criptografa a senha informada.
            fieldsToUpdate.push('password = ?'); // Adiciona o campo password ao array fieldsToUpdate.
            values.push(passwordCrypt); // Adiciona o valor da senha ao array values.
        }

        // Se não existir nenhum campo de atualização executa o if.
        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ error: 'Nenhum campo de atualização fornecido. Por favor, preencha ao menos um campo para atualizar.' }); // Retorna uma resposta com status 400 e um objeto JSON com a propriedade error e a mensagem de erro.
        }

        const updateQuery = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`; // A constante updateQuery armazena a consulta SQL que será feita no banco de dados para atualizar o usuário.
        values.push(user.id); // Adiciona o id do usuário ao array values.

        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
        await connection.execute(updateQuery, values); // Executa a consulta de atualização no banco de dados, passando os valores que serão atualizados.

        const updatedUserQuery = 'SELECT * FROM users WHERE id = ?'; // A constante updatedUserQuery armazena a consulta SQL que será feita no banco de dados para selecionar o usuário atualizado.

        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
        const [updatedUsers] = await connection.execute(updatedUserQuery, [user.id]); // A constante updatedUsers armazena o resultado da consulta ao banco de dados.

        const updatedUser = updatedUsers[0]; // A constante updatedUser armazena o primeiro usuário retornado pela consulta.

        return res.status(200).json({ name: updatedUser.name, email: updatedUser.email, password: updatedUser.password }); // Retorna uma resposta com status 200 e um objeto JSON com as propriedades name, email e password do usuário atualizado.
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário. Por favor, tente novamente mais tarde.' }); // Retorna uma resposta com status 500 e um objeto JSON com a propriedade error e a mensagem de erro.
    }
};

module.exports = updateUser; // Exporta a função updateUser para ser utilizada em outros arquivos.
