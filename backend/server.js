const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importando as rotas
const userRoutes = require('./src/routes/userRoutes');
const chargingStationRoutes = require('./src/routes/chargingStationRoutes');
const chargingSessionRoutes = require('./src/routes/chargingSessionRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Definindo as rotas
app.use('/api/users', userRoutes);
app.use('/api/stations', chargingStationRoutes);
app.use('/api/sessions', chargingSessionRoutes);

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo deu errado!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});