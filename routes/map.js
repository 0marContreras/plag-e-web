const express = require('express');
const router = express.Router();
const path = require("path");

// Rutas relacionadas con el mapa
router.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'map.html'));
});

// Otras rutas relacionadas con el mapa

module.exports = router;
