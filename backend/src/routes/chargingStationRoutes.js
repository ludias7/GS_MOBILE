const express = require('express');
const router = express.Router();
const ChargingStationController = require('../controllers/ChargingStationController');
const auth = require('../middlewares/auth');

router.get('/', auth, ChargingStationController.getAll);
router.get('/:id', auth, ChargingStationController.getById);
router.post('/', auth, ChargingStationController.create);
router.put('/:id', auth, ChargingStationController.update);

module.exports = router; 