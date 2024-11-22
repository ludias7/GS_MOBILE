const db = require('../config/database');

class ChargingSession {
    static create(sessionData) {
        return new Promise((resolve, reject) => {
            const { user_id, station_id, start_time, status } = sessionData;
            db.run(
                'INSERT INTO charging_sessions (user_id, station_id, start_time, status) VALUES (?, ?, ?, ?)',
                [user_id, station_id, start_time, status],
                function(err) {
                    if (err) reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    static findByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT cs.*, cs.id as session_id, st.name as station_name 
                 FROM charging_sessions cs 
                 JOIN charging_stations st ON cs.station_id = st.id 
                 WHERE cs.user_id = ?`,
                [userId],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }

    static update(id, sessionData) {
        return new Promise((resolve, reject) => {
            const { end_time, status, energy_consumed } = sessionData;
            db.run(
                'UPDATE charging_sessions SET end_time = ?, status = ?, energy_consumed = ? WHERE id = ?',
                [end_time, status, energy_consumed, id],
                (err) => {
                    if (err) reject(err);
                    resolve();
                }
            );
        });
    }

    static findActiveByStationId(stationId) {
        return new Promise((resolve, reject) => {
            db.all(
                'SELECT cs.*, st.available_power FROM charging_sessions cs ' +
                'JOIN charging_stations st ON cs.station_id = st.id ' +
                'WHERE cs.station_id = ? AND cs.status = "ACTIVE"',
                [stationId],
                (err, rows) => {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM charging_sessions WHERE id = ?', [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }
}

module.exports = ChargingSession;