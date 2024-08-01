const connection = require("../database/connection");
const userSchema = require("../schema/usersSchema");

const emailExists = async (email) => {
  const query = "SELECT COUNT(*) as count FROM users WHERE email = ?";
  const result = await connection.execute(query, [email]);
  return result[0][0].count > 0;
};

const validateRegister = async (req, res, next) => {
  const { email } = req.body;

  try {
    userSchema.userInfosSchema.parse(req.body);

    if (await emailExists(email)) {
      return res
        .status(400)
        .json({ error: "O endereço de e-mail já está em uso." });
    }

    next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors[0].message,
    });
  }
};

const validateLogin = async (req, res, next) => {
  const { email } = req.body;

  try {
    userSchema.userCredentialSchema.parse(req.body);

    if (!(await emailExists(email))) {
      return res
        .status(400)
        .json({ error: "O endereço de e-mail digitado não existe." });
    }

    next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors[0].message,
    });
  }
};

const validateUser = (req, res, next) => {
  try {
    userSchema.userPasswordSchema.parse(req.body);

    next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors[0].message,
    });
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUser,
};
