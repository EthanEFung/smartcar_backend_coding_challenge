const router = require('express').Router();
const vehicles = require('./vehicles');

router.get('/', (req, res) => res.sendStatus(200));
router.use('/vehicles', vehicles);

module.exports = router;