const app = require("./app");
const swaggerDocument = require("../swagger.json");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`),
);

const options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
