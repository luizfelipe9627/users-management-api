const connection = require("../database/connection");
const {verifyToken} = require("../auth/tokenAuth");
const {validatePassword} = require("../auth/passwordAuth");

const deleteUser = async (req, res) => {
    try {
        const { password, token } = req.body;

        try {
            await verifyToken(token);
        } catch (err) {
            return res.status(401).json({ error: 'O token fornecido é inválido ou expirou. Por favor, faça login novamente para obter um novo token.' });
        }

        const querySelect = 'SELECT * FROM users WHERE token = ?';
        const [users] = await connection.execute(querySelect, [token]);
        const user = users[0];

        const comparePassword = await validatePassword(password, user.password)

        if (comparePassword) {
            const queryDelete = 'DELETE FROM users WHERE token = ?';
            await connection.execute(queryDelete, [token]);

            return res.status(200).json({ message: "Conta deletada com sucesso." });
        } else {
            return res.status(400).json({ error: 'A senha fornecida está incorreta. Verifique e tente novamente.' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = deleteUser;