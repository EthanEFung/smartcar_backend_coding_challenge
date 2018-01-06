
const router = require('express').Router();

//route controllers
const { vehicleInfo } = require('../controllers/vehicles/vehicleInfo');
const { security } = require('../controllers/vehicles/security');
const { fuelRange } = require('../controllers/vehicles/fuelRange');
const batteryRange = require('../controllers/vehicles/batteryRange');
const engineAction = require('../controllers/vehicles/engineAction');

router
  .get('/:id', vehicleInfo)
  .get('/:id/doors', security)
  .get('/:id/fuel', fuelRange)
  .get('/:id/battery', batteryRange)
  .post('/:id/engine', engineAction);

module.exports = router;