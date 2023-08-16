const express = require('express');
const router = express.Router();
const path = require("path");

// Rutas relacionadas con la compra
router.get('/buy', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'buy.html'));
});

// Otras rutas relacionadas con la compra

module.exports = router;
