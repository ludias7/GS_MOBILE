const db = require('../config/database');

class User {
    static create(userData) {
        return new Promise((resolve, reject) => {
            const { name, email, password } = userData;
            db.run(
                'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [name, email, password],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get(
                'SELECT * FROM users WHERE id = ?',
                [id],
                (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                }
            );
        });
    }
}

module.exports = User;