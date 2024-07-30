const { verifyJWT } = require("../auth/tokenAuth");

const authToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Você precisa estar autenticado para acessar este recurso." });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token malformado.' });
    }

    const decoded = await verifyJWT(token);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ error: "O token informado é inválido." });
  }
}

module.exports = authToken;
