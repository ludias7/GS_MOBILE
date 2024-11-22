const ChargingStationService = require('../services/ChargingStationService');

class ChargingStationController {
    async create(req, res) {
        try {
            const station = await ChargingStationService.createStation(req.body);
            res.status(201).json(station);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            console.log('Recebendo requisição GET /api/stations');
            console.log('User ID:', req.userId);
            const stations = await ChargingStationService.getAllStations();
            console.log('Estações encontradas:', stations);
            res.json(stations);
        } catch (error) {
            console.error('Erro ao buscar estações:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const station = await ChargingStationService.getStationById(req.params.id);
            res.json(station);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const station = await ChargingStationService.updateStation(req.params.id, req.body);
            res.json(station);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            await ChargingStationService.deleteStation(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ChargingStationController();