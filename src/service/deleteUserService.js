const connection = require("../database/connection"); // Importa a conexão com o banco de dados.
const { validatePassword } = require("../auth/passwordAuth"); // Importa a função validatePassword do arquivo passwordAuth.js.

// A função deleteUser é responsável por deletar um usuário do banco de dados, recebe dois parâmetros a requisição e a resposta. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const deleteUser = async (req, res) => {
  // O try é um bloco de código que pode gerar uma exceção. O código dentro do bloco try é executado e se ocorrer um erro, o bloco catch é executado.
  try {
    const { password } = req.body; // A constante password armazena a senha do usuário que foi enviada na requisição.

    const authHeader = req.headers.authorization; // A constante authHeader armazena o cabeçalho de autorização da requisição.
    const token = authHeader.split(" ")[1]; // A constante token armazena o token de autenticação, que é obtido através da função split que divide a string em um array de substrings, utilizando o espaço como separador.

    const querySelect = "SELECT * FROM users WHERE token = ?"; // A constante querySelect armazena a consulta SQL que será feita no banco de dados para selecionar o usuário com o token informado.

    // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
    const [users] = await connection.execute(querySelect, [token]); // A constante users armazena o resultado da consulta ao banco de dados.
    const user = users[0]; // A constante user armazena o primeiro usuário retornado pela consulta.

    // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
    const comparePassword = await validatePassword(password, user.password); // A constante comparePassword armazena o resultado da função validatePassword que compara a senha informada com a senha armazenada no banco de dados.

    // Se a senha informada for igual a senha armazenada no banco de dados executa o if.
    if (comparePassword) {
      const queryDelete = "DELETE FROM users WHERE token = ?"; // A constante queryDelete armazena a consulta SQL que será feita no banco de dados para deletar o usuário com o token informado.
      await connection.execute(queryDelete, [token]); // Executa a consulta no banco de dados.

      return res.status(200).json({ message: "Conta deletada com sucesso." }); // Retorna uma resposta com status 200 e um objeto JSON com a propriedade message e a mensagem de sucesso.
    } else {
      return res
        .status(400)
        .json({
          error:
            "A senha fornecida está incorreta. Verifique e tente novamente.",
        }); // Retorna uma resposta com status 400 e um objeto JSON com a propriedade error e a mensagem de erro.
    }
  } catch (err) {
    return res
      .status(500)
      .json({
        error:
          "Erro ao deletar usuário. Por favor, tente novamente mais tarde.",
      }); // Retorna uma resposta com status 500 e um objeto JSON com a propriedade error e a mensagem de erro.
  }
};

module.exports = deleteUser;
