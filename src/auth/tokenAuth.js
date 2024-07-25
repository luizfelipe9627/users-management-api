const jwt = require("jsonwebtoken");
const connection = require("../database/connection");
const bycrypt = require("bcryptjs");

require('dotenv').config();

const getJwtSecret = async () => {
    if (process.env.JWT_SECRET) {
        return process.env.JWT_SECRET;
    } else {
        return bycrypt.hash(
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
            10
        );
    }
};

const createToken = async (id) => {
    return jwt.sign(
        {userId: id},
        await getJwtSecret(),
        {expiresIn: "20m"},
    );
}

const verifyToken = async (token) => {
    return jwt.verify(token, await getJwtSecret());
}

const updateToken = async (id, oldToken) => {
    try {
        await verifyToken(oldToken);
        return oldToken;
    } catch (err) {
        if(err.name === 'TokenExpiredError' || err.name === "JsonWebTokenError") {
            const newToken = await createToken(id);

            const updateQuery = 'UPDATE users SET token = ? WHERE id = ?';
            await connection.execute(updateQuery, [newToken, id]);
            return newToken;
        } else {
            throw err;
        }
    }
}

module.exports = {
    createToken,
    verifyToken,
    updateToken
}