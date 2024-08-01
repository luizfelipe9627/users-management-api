const mysql = require("mysql2/promise"); // Importa a biblioteca mysql2/promise, responsável por criar a conexão com o banco de dados MySQL.
const dotenv = require("dotenv"); // Importa a biblioteca dotenv, responsável por carregar as variáveis de ambiente do arquivo .env.

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env.

// A constante connection armazena a conexão com o banco de dados, utilizando o método createPool responsável por criar uma pool(connection pool) de conexões com o banco de dados.
const connection = mysql.createPool({
    // As propriedades host, user, password e database recebem os valores definidos nas variáveis de ambiente.
    host: process.env.MYSQL_HOST, 
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

module.exports = connection; // Exporta a conexão com o banco de dados.