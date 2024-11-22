const bcrypt = require('bcrypt');
const User = require('../models/User');

class UserService {
    async createUser(userData) {
        const { email, password } = userData;
        
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new Error('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        return await User.create({
            ...userData,
            password: hashedPassword
        });
    }

    async authenticateUser(email, password) {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Senha inválida');
        }

        return user;
    }

    async getUserById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user;
    }
}

module.exports = new UserService();