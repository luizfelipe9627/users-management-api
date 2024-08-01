const jwt = require("jsonwebtoken");
const connection = require("../database/connection");

require("dotenv").config();

const secretJWT = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "Você precisa definir uma variável de ambiente JWT_SECRET com um segredo para assinar o token JWT.",
    );
  }
  return secret;
};

const createJWT = (id) => {
  return jwt.sign({ userId: id }, secretJWT(), { expiresIn: "15m" });
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, secretJWT());
  } catch (err) {
    throw err;
  }
};

const updateJWT = async (id, oldToken) => {
  try {
    await verifyJWT(oldToken);
    return oldToken;
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      const newToken = await createJWT(id);

      const updateQuery = "UPDATE users SET token = ? WHERE id = ?";
      await connection.execute(updateQuery, [newToken, id]);
      return newToken;
    } else {
      throw err;
    }
  }
};

module.exports = {
  createJWT,
  verifyJWT,
  updateJWT,
};
