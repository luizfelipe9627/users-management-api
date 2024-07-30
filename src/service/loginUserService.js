const {validatePassword} = require("../auth/passwordAuth");
const {updateJWT} = require("../auth/tokenAuth");
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

        const newToken = await updateJWT(user.id, user.token);

        res.setHeader('Authorization', `Bearer ${newToken}`);

        return res.status(200).json({ token: newToken});
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = loginUser;