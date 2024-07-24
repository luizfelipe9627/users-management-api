const {validatePassword} = require("../auth/passwordAuth");
const {updateToken} = require("../auth/tokenAuth");
const connection = require("../database/connection");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = 'SELECT * FROM users WHERE email = ?';
        const [users] = await connection.execute(query, [email]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const user = users[0];

        const comparePassword = await validatePassword(password, user.password)

        if (!comparePassword) {
            return res.status(401).json({ error: 'Senha inválida.' });
        }

        await updateToken(user.id, user.token);

        const updatedUserQuery = 'SELECT * FROM users WHERE id = ?';
        const [updatedUsers] = await connection.execute(updatedUserQuery, [user.id]);

        const updatedUser = updatedUsers[0];

        return res.status(200).json({ token: updatedUser.token });
    } catch (err) {
        return res.status(500).json({ error: 'Erro ao logar usuário. Por favor, tente novamente mais tarde.' });
    }
}

module.exports = loginUser;