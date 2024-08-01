const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (password, passwordCrypt) => {
  return await bcrypt.compareSync(password, passwordCrypt);
};

module.exports = {
  encryptPassword,
  validatePassword,
};
