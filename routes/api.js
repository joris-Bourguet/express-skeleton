const express = require('express');

const exempleController = require('./controllers/exempleController');

const router = express.Router();

// ExempleRoute
router.post('/exemple-route', exempleController.exempleController)

// TODO: Add routes here for /api/...

module.exports = router