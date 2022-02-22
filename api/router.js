const router = require('express').Router();

const { auth } = require('../scripts/v0');

const { foos } = require('./v0');

// ROUTES
router.get('/foos', auth, foos.list);
router.get('/foos/:id', foos.view);
router.post('/foos', foos.create);
router.put('/foos/:id', foos.update);
router.delete('/foos/:id', foos.remove);

module.exports = router;
