const db = require('../config/database');

class ChargingStation {
    static async findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM charging_stations', [], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    static async findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM charging_stations WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    static async create(stationData) {
        return new Promise((resolve, reject) => {
            const { name, location, status, available_power, isRenewable } = stationData;
            db.run(
                'INSERT INTO charging_stations (name, location, status, available_power, isRenewable) VALUES (?, ?, ?, ?, ?)',
                [name, location, status, available_power, isRenewable],
                function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(this.lastID);
                }
            );
        });
    }

    static async update(id, stationData) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE charging_stations SET status = ? WHERE id = ?',
                [stationData.status, id],
                (err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                }
            );
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM charging_stations WHERE id = ?', [id], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}

module.exports = ChargingStation;