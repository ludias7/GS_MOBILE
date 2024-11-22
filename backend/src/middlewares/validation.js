const { body, param } = require('express-validator');

const stationValidation = [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('location').notEmpty().withMessage('Localização é obrigatória'),
    body('available_power').isNumeric().withMessage('Potência disponível deve ser um número')
];

const sessionValidation = [
    body('stationId').isNumeric().withMessage('ID da estação inválido'),
    body('energyConsumed').optional().isNumeric().withMessage('Consumo de energia deve ser um número')
];

module.exports = {
    stationValidation,
    sessionValidation
};