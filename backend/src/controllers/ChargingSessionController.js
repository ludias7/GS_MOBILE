const ChargingSessionService = require('../services/ChargingSessionService');

class ChargingSessionController {
    async startCharging(req, res) {
        try {
            const { stationId } = req.body;
            const userId = req.userId;
            console.log('Iniciando carregamento:', { stationId, userId });
            const session = await ChargingSessionService.startCharging(userId, stationId);
            console.log('Sessão criada:', session);
            res.status(201).json(session);
        } catch (error) {
            console.error('Erro ao iniciar carregamento:', error);
            res.status(400).json({ error: error.message });
        }
    }

    async stopCharging(req, res) {
        try {
            const { sessionId, energyConsumed } = req.body;
            const session = await ChargingSessionService.stopCharging(sessionId, energyConsumed);
            res.json(session);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getUserSessions(req, res) {
        try {
            const userId = req.userId;
            const sessions = await ChargingSessionService.getUserSessions(userId);
            res.json(sessions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getStationActiveSessions(req, res) {
        try {
            const { stationId } = req.params;
            const sessions = await ChargingSessionService.getActiveSessionsByStation(stationId);
            res.json(sessions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ChargingSessionController();