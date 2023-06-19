const express = require('express');
const router = express.Router();
const path = require("path");

// Rutas relacionadas con la página de inicio
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'home.html'));
});

// Otras rutas relacionadas con la página de inicio

module.exports = router;
