const jwt = require('../config/jwt');

module.exports = (req, res, next) => {
    try {
        console.log('Headers recebidos:', req.headers);
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            console.log('Token não encontrado');
            return res.status(401).json({ error: 'Token não fornecido' });
        }

        console.log('Token encontrado:', token);
        const decoded = jwt.verify(token);
        req.userId = decoded.userId;
        console.log('Token decodificado:', decoded);
        next();
    } catch (error) {
        console.error('Erro na autenticação:', error);
        res.status(401).json({ error: 'Token inválido' });
    }
};