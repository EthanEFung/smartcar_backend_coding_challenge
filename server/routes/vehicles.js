
const router = require('express').Router();

router
  .get('/:id', (req, res) => {
    res.send(`vehicle ${req.params.id}`)
  })
  .get('/:id/fuel', (req, res) => res.send('fuel'))
  .get('/:id/battery', (req, res) => {
    res.send('battery');
  })
  .post('/:id/engine', (req, res) => {
    res.send('engine')
  });

module.exports = router;