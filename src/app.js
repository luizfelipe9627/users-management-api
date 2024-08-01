const router = require("./routes/router"); // Importa o arquivo de rotas da aplicação.
const express = require("express"); // Importa a biblioteca express que é responsável por criar a aplicação.
const cors = require("cors"); // Importa a biblioteca cors, responsável por permitir que a API seja acessada por outros domínios como o frontend.

const app = express(); // Cria a aplicação express.

app.use(cors()); // Adiciona o middleware cors à aplicação, permitindo que a API seja acessada por outros domínios.
app.use(express.json()); // Adiciona o middleware express.json à aplicação, responsável por fazer o parse do corpo da requisição para JSON.
app.use(router); // Adiciona o arquivo de rotas à aplicação, permitindo que as rotas sejam acessadas.

module.exports = app; // Exporta a aplicação para ser utilizada em outros arquivos.