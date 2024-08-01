const { verifyJWT } = require("../auth/tokenAuth"); // Importa a função verifyJWT do arquivo tokenAuth.js, responsável por verificar se o token é válido.

// A função authToken é um middleware responsável por verificar se o token de autenticação foi informado na requisição e se ele é válido. Recebe os parâmetros req que representa a requisição, res que representa a resposta e next que é uma função que chama o próximo middleware. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const authToken = async (req, res, next) => {
  // O try é um bloco de código que pode gerar uma exceção. O código dentro do bloco try é executado e se ocorrer um erro, o bloco catch é executado.
  try {
    const authHeader = req.headers.authorization; // A constante authHeader armazena o cabeçalho de autorização da requisição.

    // Se o cabeçalho de autorização não existir executa o if.
    if (!authHeader) {
      // Retorna uma resposta com status 401 e um objeto JSON com a propriedade error e a mensagem de erro.
      return res.status(401).json({ error: "Você precisa estar autenticado para acessar este recurso." });
    }

    const token = authHeader.split(' ')[1]; // A constante token armazena o token de autenticação, que é obtido através da função split que divide a string em um array de substrings, utilizando o espaço como separador.

    // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
    const decoded = await verifyJWT(token); // A constante decoded armazena o resultado da função verifyJWT que recebe e verifica se o token é válido, se for ele continua o código, se não for ele retorna um erro.

    req.userId = decoded.userId;  // A propriedade userId do objeto req recebe o valor do id do usuário que está armazenado no token.

    next(); // Continua para o próximo middleware.
  } catch (err) {
    return res.status(401).json({ error: "O token informado é inválido." }); // Retorna uma resposta com status 401 e um objeto JSON com a propriedade error e a mensagem de erro.
  }
}
// Exporta a função authToken para ser utilizada em outros arquivos.
module.exports = authToken; 
