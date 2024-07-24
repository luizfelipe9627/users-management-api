const {encryptPassword} = require("../auth/passwordAuth");
const connection = require("../database/connection");
const {createToken} = require("../auth/tokenAuth");

const registerUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body;

        const hashPassword = await encryptPassword(password)

        const token = await createToken(id)

        const query = 'INSERT INTO users (name, email, password, token) VALUES (?,?,?,?);';
        const [result] = await connection.execute(query, [name, email, hashPassword, token]);

        const userId = result.insertId;

        const updatedUserQuery = 'SELECT * FROM users WHERE id = ?';
        const [updatedUsers] = await connection.execute(updatedUserQuery, [userId]);

        const updatedUser = updatedUsers[0];

        return res.status(200).json({ token: updatedUser.token });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.' });
    }
}

module.exports = registerUser;