const {verifyToken} = require("../auth/tokenAuth");
const connection = require("../database/connection");
const {encryptPassword} = require("../auth/passwordAuth");

const updateUser = async (req, res) => {
    try {
        const { name, email, password, token } = req.body;

        try {
            await verifyToken(token);
        } catch (err) {
            return res.status(401).json({ error: 'O token fornecido é inválido ou expirou. Por favor, faça login novamente para obter um novo token.' });
        }

        const query = 'SELECT * FROM users WHERE token = ?';
        const [users] = await connection.execute(query, [token]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const user = users[0];

        const fieldsToUpdate = [];
        const values = [];

        if (name) {
            fieldsToUpdate.push('name = ?');
            values.push(name);
        }

        if (email) {
            fieldsToUpdate.push('email = ?');
            values.push(email);
        }

        if (password) {
            const passwordCrypt = await encryptPassword(password)
            fieldsToUpdate.push('password = ?');
            values.push(passwordCrypt);
        }

        if (fieldsToUpdate.length === 0) {
            return res.status(400).json({ error: 'Nenhum campo de atualização fornecido. Por favor, preencha ao menos um campo para atualizar.' });
        }

        const updateQuery = `UPDATE users SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;
        values.push(user.id);

        await connection.execute(updateQuery, values);

        const updatedUserQuery = 'SELECT * FROM users WHERE id = ?';
        const [updatedUsers] = await connection.execute(updatedUserQuery, [user.id]);

        const updatedUser = updatedUsers[0];

        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao atualizar usuário. Por favor, tente novamente mais tarde.' });
    }
};

module.exports = updateUser;