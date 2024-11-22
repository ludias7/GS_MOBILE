const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

module.exports = {
    sign: (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }),
    verify: (token) => jwt.verify(token, JWT_SECRET)
};