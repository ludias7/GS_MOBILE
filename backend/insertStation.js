const db = require('./src/config/database');

const stations = [
    {
        name: 'Estação Rápida 1',
        location: 'Estacionamento A',
        status: 'AVAILABLE',
        available_power: 50.0,
        isRenewable: true
    },
    {
        name: 'Estação Ultra-Rápida 2',
        location: 'Estacionamento B',
        status: 'AVAILABLE',
        available_power: 150.0,
        isRenewable: true
    },
    {
        name: 'Estação Normal 3',
        location: 'Subsolo 1',
        status: 'AVAILABLE',
        available_power: 22.0,
        isRenewable: false
    },
    {
        name: 'Estação Rápida 4',
        location: 'Térreo',
        status: 'AVAILABLE',
        available_power: 75.0,
        isRenewable: true
    },
    {
        name: 'Estação Normal 5',
        location: 'Subsolo 2',
        status: 'AVAILABLE',
        available_power: 22.0,
        isRenewable: false
    }
];

stations.forEach(station => {
    db.run(
        'INSERT INTO charging_stations (name, location, status, available_power, isRenewable) VALUES (?, ?, ?, ?, ?)',
        [station.name, station.location, station.status, station.available_power, station.isRenewable],
        function(err) {
            if (err) {
                console.error('Erro ao inserir estação:', err);
            } else {
                console.log(`Estação ${station.name} inserida com sucesso!`);
            }
        }
    );
});