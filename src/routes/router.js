const express = require("express"); // Importa a biblioteca express, responsável por criar a aplicação.
const registerUser = require("../service/registerUserService"); // Importa a função registerUser do arquivo registerUserService.js, responsável por cadastrar um usuário.
const loginUser = require("../service/loginUserService"); // Importa a função loginUser do arquivo loginUserService.js, responsável por fazer o login de um usuário.
const updateUser = require("../service/profileUserService"); // Importa a função updateUser do arquivo profileUserService.js, responsável por atualizar o perfil de um usuário.
const deleteUser = require("../service/deleteUserService"); // Importa a função deleteUser do arquivo deleteUserService.js, responsável por deletar um usuário.
const {validateRegister, validateLogin, validateUser} = require("../middleware/validateInput");   
const authToken = require("../middleware/authToken"); // Importa a função authToken do arquivo authToken.js, responsável por verificar se o token é válido.

const router = express.Router(); // A constante router armazena o objeto Router do express, responsável por criar as rotas da aplicação.

router.post("/auth/register", validateRegister, registerUser); // O router está criando uma rota POST(envio de dados) para o endpoint /auth/register, que executa o middleware validateRegister e depois a função registerUser.
router.post("/auth/login", validateLogin, loginUser); // O router está criando uma rota POST(envio de dados) para o endpoint /auth/login, que executa o middleware validateLogin e depois a função loginUser.

router.put("/user/profile", authToken, updateUser); // O router está criando uma rota PUT(atualização de dados) para o endpoint /user/profile, que executa o middleware authToken e depois a função updateUser.
router.delete("/user/delete", authToken, validateUser, deleteUser); // O router está criando uma rota DELETE(deleção de dados) para o endpoint /user/delete, que executa o middleware authToken, validateUser e depois a função deleteUser.

module.exports = router; // Exporta o objeto router para ser utilizado em outros arquivos.