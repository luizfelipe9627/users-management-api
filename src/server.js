const app = require("./app"); // Importa a aplicação express do arquivo app.js.
const swaggerDocument = require("../swagger.json"); // Importa o arquivo swagger.json, responsável por documentar a API.
const dotenv = require("dotenv"); // Importa a biblioteca dotenv, responsável por carregar as variáveis de ambiente.
const swaggerUi = require("swagger-ui-express"); // Importa a biblioteca swagger-ui-express, responsável por exibir a documentação da API.

dotenv.config(); // Carrega as variáveis de ambiente.

const PORT = process.env.PORT || 3000; // A constante PORT armazena a porta da aplicação, caso a variável de ambiente PORT não exista, a porta será 3000.

// O método listen é responsável por iniciar o servidor, ele recebe dois parâmetros, a porta e uma função de callback que é executada quando o servidor é iniciado.
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`),
);

// A constante options armazena um objeto com a propriedade customCss que é responsável por ocultar a barra superior do Swagger UI.
const options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

// O método use é responsável por adicionar um middleware à aplicação, ele recebe três parâmetros, o endpoint, o middleware serve e o middleware setup.
app.use(
  "/", // O endpoint é a raiz da aplicação.
  swaggerUi.serve, // O middleware serve é responsável por servir a documentação da API.
  swaggerUi.setup(swaggerDocument, options), // O middleware setup é responsável por configurar a documentação da API, ele recebe dois parâmetros, o arquivo swagger.json e as opções de configuração.
);
