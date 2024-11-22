const express = require('express');
const router = express.Router();
const ChargingSessionController = require('../controllers/ChargingSessionController');
const auth = require('../middlewares/auth');
const { sessionValidation } = require('../middlewares/validation');
const ChargingSessionService = require('../services/ChargingSessionService');

router.post('/start', auth, sessionValidation, ChargingSessionController.startCharging);
router.post('/stop', auth, sessionValidation, ChargingSessionController.stopCharging);
router.get('/station/:stationId/active', auth, ChargingSessionController.getStationActiveSessions);
router.get('/user', auth, ChargingSessionController.getUserSessions);
router.get('/station/:id/active', auth, async (req, res) => {
    try {
        const sessions = await ChargingSessionService.getActiveSessionsByStation(req.params.id);
        res.json(sessions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;