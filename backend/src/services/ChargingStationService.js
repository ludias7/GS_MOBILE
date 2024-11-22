const ChargingStation = require('../models/ChargingStation');



class ChargingStationService {
    async createStation(stationData) {
        try {
            const id = await ChargingStation.create({
                ...stationData,
                status: 'AVAILABLE'
            });
            return { id, ...stationData };
        } catch (error) {
            throw new Error('Erro ao criar estação de recarga');
        }
    }

    async getAllStations() {
        try {
            console.log('Buscando todas as estações...');
            const stations = await ChargingStation.findAll();
            console.log('Estações encontradas:', stations);
            return stations;
        } catch (error) {
            console.error('Erro ao buscar estações:', error);
            throw new Error('Erro ao buscar estações');
        }
    }

    async getStationById(id) {
        try {
            const station = await ChargingStation.findById(id);
            if (!station) {
                throw new Error('Estação não encontrada');
            }
            return station;
        } catch (error) {
            throw new Error('Erro ao buscar estação');
        }
    }

    async updateStation(id, stationData) {
        try {
            await ChargingStation.update(id, stationData);
            return { id, ...stationData };
        } catch (error) {
            throw new Error('Erro ao atualizar estação');
        }
    }

    async deleteStation(id) {
        try {
            await ChargingStation.delete(id);
        } catch (error) {
            throw new Error('Erro ao deletar estação');
        }
    }
}

module.exports = new ChargingStationService();