const connection = require("../database/connection"); // Importa a conexão com o banco de dados.
const userSchema = require("../schema/usersSchema"); // Importa o schema de validação de usuários.

// A função emailExists é responsável por verificar se um e-mail já está cadastrado no banco de dados, recebe um e-mail como parâmetro. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const emailExists = async (email) => {
  const query = "SELECT COUNT(*) as count FROM users WHERE email = ?"; // Query que será executada no banco de dados, retornando a quantidade de e-mails iguais ao e-mail passado como parâmetro.
  // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a execução da query seja finalizada.
  const result = await connection.execute(query, [email]); // Executa a query no banco de dados, passando o e-mail como parâmetro.
  return result[0][0].count > 0; // Retorna true se a quantidade de e-mails for maior que 0, ou seja, se o e-mail já estiver cadastrado no banco de dados.
};

// A função validateRegister é responsável por validar os dados de registro de um usuário, recebe como parâmetro a requisição, a resposta e a próxima função a ser executada.
const validateRegister = async (req, res, next) => {
  const { email } = req.body; // A variável email recebe o valor do campo email da requisição.

  // O try é utilizado para tentar executar o código, caso ocorra algum erro, ele é capturado no catch.
  try {
    userSchema.userInfosSchema.parse(req.body); // Executa a validação do schema de informações do usuário, passando o corpo da requisição como parâmetro.

    // Verifica se o e-mail já está cadastrado no banco de dados através da função emailExists, passando o e-mail como parâmetro, se o e-mail já estiver cadastrado ou seja true, executará o if. O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.

    if (await emailExists(email)) {
      return res
        .status(400)
        .json({ error: "O endereço de e-mail já está em uso." }); // Retorna um erro 400 com a mensagem de que o e-mail já está em uso.
    }

    next(); // A função next é chamada para prosseguir para a próxima função a ser executada.
  } catch (err) {
    return res.status(400).json({ error: err.errors[0].message }); // Retorna um erro 400 com a mensagem do erro passada no schema de validação.
  }
};

// A função validateLogin é responsável por validar os dados de login de um usuário, recebe como parâmetro a requisição, a resposta e a próxima função a ser executada.
const validateLogin = async (req, res, next) => {
  const { email } = req.body; // A variável email recebe o valor do campo email da requisição.

  try {
    userSchema.userCredentialSchema.parse(req.body); // Executa a validação do schema de credenciais do usuário, passando o corpo da requisição como parâmetro.

    // Verifica se o e-mail não está cadastrado no banco de dados através da função emailExists, passando o e-mail como parâmetro, se o e-mail não estiver cadastrado ou seja false, executará o if. O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
    if (!(await emailExists(email))) {
      return res
        .status(400)
        .json({ error: "O endereço de e-mail digitado não existe." }); // Retorna um erro 400 com a mensagem de que o e-mail não existe.
    }

    next(); // A função next é chamada para prosseguir para a próxima função a ser executada.
  } catch (err) {
    return res.status(400).json({ error: err.errors[0].message }); // Retorna um erro 400 com a mensagem do erro passada no schema de validação.
  }
};

// A função validateUser é responsável por validar os dados de um usuário, recebe como parâmetro a requisição, a resposta e a próxima função a ser executada.
const validateUser = async (req, res, next) => {
  // O try é utilizado para tentar executar o código, caso ocorra algum erro, ele é capturado no catch.
  try {
    userSchema.userPasswordSchema.parse(req.body); // Executa a validação do schema de senha do usuário, passando o corpo da requisição como parâmetro.

    next(); // A função next é chamada para prosseguir para a próxima função a ser executada.
  } catch (err) {
    return res.status(400).json({ error: err.errors[0].message }); // Retorna um erro 400 com a mensagem do erro passada no schema de validação.
  }
};

// Exporta as funções validateRegister, validateLogin e validateUser para serem utilizadas em outros arquivos.
module.exports = {
  validateRegister,
  validateLogin,
  validateUser,
};
