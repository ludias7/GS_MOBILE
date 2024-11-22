const db = require('./database');

// Criação das tabelas
db.serialize(() => {
    // Tabela de estações
    db.run(`
        CREATE TABLE IF NOT EXISTS charging_stations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            status TEXT NOT NULL,
            available_power REAL NOT NULL,
            isRenewable BOOLEAN DEFAULT 0
        )
    `);

    // Tabela de sessões
    db.run(`
        CREATE TABLE IF NOT EXISTS charging_sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            station_id INTEGER NOT NULL,
            start_time TEXT NOT NULL,
            end_time TEXT,
            status TEXT NOT NULL,
            energy_consumed REAL,
            FOREIGN KEY (station_id) REFERENCES charging_stations (id),
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `);
}); 