const ChargingStation = require('../models/ChargingStation');
const ChargingSession = require('../models/ChargingSession');

class ChargingSessionService {
    async startCharging(userId, stationId) {
        try {
            const station = await ChargingStation.findById(stationId);
            if (!station) {
                throw new Error('Estação não encontrada');
            }

            if (station.status !== 'AVAILABLE') {
                throw new Error('Estação não está disponível');
            }

            const sessionData = {
                user_id: userId,
                station_id: stationId,
                start_time: new Date().toISOString(),
                status: 'ACTIVE'
            };

            const sessionId = await ChargingSession.create(sessionData);
            await ChargingStation.update(stationId, { ...station, status: 'IN_USE' });

            return { id: sessionId, ...sessionData };
        } catch (error) {
            throw new Error(`Erro ao iniciar recarga: ${error.message}`);
        }
    }

    async stopCharging(sessionId, energyConsumed) {
        try {
            const session = await ChargingSession.findById(sessionId);
            if (!session) {
                throw new Error('Sessão não encontrada');
            }
    
            const sessionData = {
                end_time: new Date().toISOString(),
                status: 'COMPLETED',
                energy_consumed: energyConsumed
            };
    
            await ChargingSession.update(sessionId, sessionData);
            await ChargingStation.update(session.station_id, { status: 'AVAILABLE' });
            
            return { ...sessionData, station_id: session.station_id };
        } catch (error) {
            throw new Error(`Erro ao finalizar recarga: ${error.message}`);
        }
    }

    async getUserSessions(userId) {
        try {
            return await ChargingSession.findByUserId(userId);
        } catch (error) {
            throw new Error('Erro ao buscar sessões do usuário');
        }
    }

    async getActiveSessionsByStation(stationId) {
        try {
            return await ChargingSession.findActiveByStationId(stationId);
        } catch (error) {
            throw new Error('Erro ao buscar sessões ativas');
        }
    }
}

module.exports = new ChargingSessionService();