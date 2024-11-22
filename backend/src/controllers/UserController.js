const UserService = require('../services/UserService');
const jwt = require('../config/jwt');

class UserController {
    async register(req, res) {
        try {
            const userData = req.body;
            const user = await UserService.createUser(userData);
            res.status(201).json({ message: 'Usuário criado com sucesso', userId: user.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.authenticateUser(email, password);
            const token = jwt.sign({ userId: user.id });
            res.json({ token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async getProfile(req, res) {
        try {
            const userId = req.userId;
            const user = await UserService.getUserById(userId);
            delete user.password;
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new UserController();