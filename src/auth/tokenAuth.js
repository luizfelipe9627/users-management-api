const jwt = require("jsonwebtoken"); // Importa a biblioteca jsonwebtoken, responsável por criar e validar tokens JWT.
const connection = require("../database/connection"); // Importa o arquivo connection.js, responsável por fazer a conexão com o banco de dados.
const dotenv = require("dotenv"); // Importa a biblioteca dotenv, responsável por carregar as variáveis de ambiente do arquivo .env.

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env.

// A função secretJWT é responsável por retornar o segredo que será utilizado para assinar o token JWT.
const secretJWT = () => {
    const secret = process.env.JWT_SECRET; // A variável secret recebe o valor da variável de ambiente JWT_SECRET.

    // Caso a variável secret não exista, é lançado um erro.
    if (!secret) {
        // O throw new Error lança um erro, interrompendo a execução do código.
        throw new Error('Você precisa definir uma variável de ambiente JWT_SECRET com um segredo para assinar o token JWT.');
    }

    return secret; // Caso a variável secret exista, ela é retornada.
};

// A função createJWT é responsável por criar um token JWT, recebe o id do usuário como parâmetro.
const createJWT = (id) => {
    // Retorna o token JWT assinado com o id do usuário, o segredo e a expiração definida.
    return jwt.sign(
        {userId: id}, // O payload do token é o id do usuário.
        secretJWT(), // O segredo utilizado para assinar o token é retornado pela função secretJWT.
        {expiresIn: "15m"}, // O token expira em 15 minutos, fazendo com que o usuário precise fazer login novamente após esse tempo.
    );
}

// A função verifyJWT é responsável por verificar se um token JWT é válido, recebe o token como parâmetro.
const verifyJWT = (token) => {
    // O try é utilizado para tentar executar o código, caso ocorra algum erro, ele é capturado no catch.
    try {
        return jwt.verify(token, secretJWT()); // O jwt.verify é responsável por verificar se o token é válido. Recebe dois parâmetros, o token e o segredo utilizado para assinar o token.
    } catch (err) {
        throw err; // Caso ocorra um erro, ele é lançado
    }
};

// A função updateJWT é responsável por atualizar um token JWT caso ele esteja expirado, recebe o id do usuário e o token como parâmetros. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const updateJWT = async (id, oldToken) => {
    // O try é utilizado para tentar executar o código, caso ocorra algum erro, ele é capturado no catch.
    try {
        // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que o token seja verificado.
        await verifyJWT(oldToken); // Executa a função verifyJWT para verificar se o token é válido, passando o token como parâmetro.
        return oldToken; // Caso o token seja válido, ele é retornado.
    } catch (err) {
        // Se o erro for do tipo TokenExpiredError ou JsonWebTokenError, ou seja, se o token estiver expirado ou inválido, o código dentro do if é executado.
        if(err.name === 'TokenExpiredError' || err.name === "JsonWebTokenError") {
            const newToken = await createJWT(id); // Armazena na variável newToken um novo token JWT criado através da função createJWT, passando o id do usuário como parâmetro.

            const updateQuery = 'UPDATE users SET token = ? WHERE id = ?'; // A variável updateQuery armazena a query SQL que será executada para atualizar o token do usuário no banco de dados.
            // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que o token seja atualizado no banco de dados.
            await connection.execute(updateQuery, [newToken, id]); // Executa a query SQL para atualizar o token do usuário no banco de dados, passando o novo token e o id do usuário como parâmetros.

            return newToken; // Retorna o novo token JWT.
        } else {
            throw err; // O throw lança o erro, interrompendo a execução do código.
        }
    }
}

// Exporta as funções createJWT, verifyJWT e updateJWT para serem utilizadas em outros arquivos.
module.exports = {
    createJWT,
    verifyJWT,
    updateJWT
}