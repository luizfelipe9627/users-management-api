const {encryptPassword} = require("../auth/passwordAuth");
const connection = require("../database/connection");
const {createJWT} = require("../auth/tokenAuth");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashPassword = await encryptPassword(password)

        const token = await createJWT(email)

        const query = 'INSERT INTO users (name, email, password, token) VALUES (?,?,?,?);';
        const [result] = await connection.execute(query, [name, email, hashPassword, token]);

        const userId = result.insertId;

        const updatedUserQuery = 'SELECT * FROM users WHERE id = ?';
        const [updatedUsers] = await connection.execute(updatedUserQuery, [userId]);

        const updatedUser = updatedUsers[0];

        res.setHeader('authorization', `Bearer ${updatedUser.token}`);

        return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.' });
    }
}

module.exports = registerUser;