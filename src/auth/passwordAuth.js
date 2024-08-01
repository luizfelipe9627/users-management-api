const bcrypt = require("bcryptjs"); // Importa a biblioteca bcryptjs, responsável por criar e validar a criptografia de senhas.

// Função chamada encryptPassword, que recebe uma senha como parâmetro. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const encryptPassword = async (password) => {
  // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja criptografada.
  return await bcrypt.hash(password, 10); // O bcrypt.hash é responsável por criptografar a senha. O primeiro parâmetro é a senha que será criptografada e o segundo é o número de rounds que a senha será criptografada.
};

// A função validatePassword é responsável por validar a senha, recebe a senha e a senha criptografada como parâmetros. O async está tornando a função assíncrona, fazendo com que o código só prossiga após a execução dela.
const validatePassword = async (password, passwordCrypt) => {
  // O await faz com que a execução da função seja pausada até que a Promise seja resolvida, ou seja, até que a senha seja validada.
  return await bcrypt.compareSync(password, passwordCrypt); // O bcrypt.compareSync é responsável por comparar a senha com a senha criptografada. O primeiro parâmetro é a senha que será comparada e o segundo é a senha criptografada.
};

// Exporta as funções encryptPassword e validatePassword para serem utilizadas em outros arquivos.
module.exports = {
  encryptPassword,
  validatePassword,
};
